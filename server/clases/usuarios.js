class Usuarios {

    constructor() {
        this.personas = [];
    }

    addPerson(id,nombre,sala) {
        let persona = {id,nombre,sala};
        this.personas.push(persona);
        
        return this.personas;

    }

    getPersona(id) {
        let persona =  this.personas.filter(ele => {
            return ele.id === id;
        })[0];
        
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonaSala(sala) {
        let personaEnSala = this.personas.filter(ele => {
            return ele.sala == sala;
        })

        return personaEnSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(ele => {
            return ele.id != id;
        });

        return personaBorrada;
    }


}

module.exports = {
    Usuarios
}