
var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'
    throw new Error('El nombre el necesarop');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat',usuario,function(resp) {
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function() {
    
    console.log('Perdimos conexión con el servidor');

});


// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

socket.on('listaPersona',(resp) => {
    console.log(resp);
})

socket.on('mensajePrivado',function(mensaje) {
    console.log('Mensaje Privado: '+mensaje)
})