const { io } = require('../server');

const { Usuarios } = require('../clases/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    //console.log('Usuario conectado');

    client.on('entrarChat',(usu,callback) => {

        if(!usu.nombre || !usu.sala) {
            return callback({
                error:true,
                mensaje: 'El nombre es necesario'
            });
        }

        client.join(usu.sala);

        usuarios.addPerson(client.id,usu.nombre,usu.sala)
        
        client.broadcast.to(usu.sala).emit('listaPersona',usuarios.getPersonaSala(usu.sala));
        
        callback(usuarios.getPersonaSala(usu.sala));

    })

    client.on('crearMensaje',(data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre,data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje',mensaje);
        
    });

    client.on('disconnect',() => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Admin','persona borrada'))

        client.broadcast.to(personaBorrada.sala).emit('listaPersona',usuarios.getPersonaSala(personaBorrada.sala));

        
    })

    client.on('mensajePrivado',data => {
        let persona = usuarios.getPersona(client.id);

        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje))
    })

});