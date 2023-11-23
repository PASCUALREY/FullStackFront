const BASE_URL = "https://juegovestir-api.onrender.com";

document.addEventListener("DOMContentLoaded", function () {
    fetch(BASE_URL+'/api/public/ultimospersonajes')
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => mostrarJugadores(json))    //imprimir los datos en la consola
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });

    function mostrarJugadores(json) {
        for (let index = 0; index < json.length; index++) {
            buscarRostro(json[index],index+1);
            buscarSuperior(json[index],index+1);
            buscarInferior(json[index],index+1);
            buscarCalzado(json[index],index+1);
        }
    }


function buscarRostro(json,i) {
    fetch(BASE_URL+"/api/personajes/" + json.character)
        .then(response => response.json())  // convertir a json
        .then(json => mostrarRostro(json,i))
        .catch(error => {
            console.error("Error en la solicitud:", error);
        })
}

function mostrarRostro(json,i) {
    const rostro = "rostro"+i;
    document.getElementById(rostro).style.backgroundImage = "url('../assets/personajes/" + json.faceImg + "')";
    document.getElementById(rostro).style.display = "block";
}
});

function buscarSuperior(json,i) {
    fetch(BASE_URL+"/api/vestimenta/" + json.superior)
        .then(response => response.json())  // convertir a json
        .then(json => mostrarSuperior(json,i))
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

function mostrarSuperior(json,i) {
    const superior = "remera"+i;
    document.getElementById(superior).style.backgroundImage = "url(../assets/vestimentas/" + json.img;
    document.getElementById(superior).style.display = "block";
}

function buscarInferior(json,i) {
    fetch(BASE_URL+"/api/vestimenta/" + json.inferior)
        .then(response => response.json())  // convertir a json
        .then(json => mostrarInferior(json,i))
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

function mostrarInferior(json,i) {
    const pantalon = "pantalon"+i;
    document.getElementById(pantalon).style.backgroundImage = "url(../assets/vestimentas/" + json.img;
    document.getElementById(pantalon).style.display = "block";
}

function buscarCalzado(json,i) {
    fetch(BASE_URL+"/api/vestimenta/" + json.calzado)
        .then(response => response.json())  // convertir a json
        .then(json => mostrarCalzado(json,i))
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

function mostrarCalzado(json,i) {
    const zapatilla_izq = "zapatilla-izq";
    const zapatilla_der = "zapatilla-der";
    document.getElementById(zapatilla_izq+i).style.backgroundImage = "url(../assets/vestimentas/" + json.img;
    document.getElementById(zapatilla_izq+i).style.display = "block";
    document.getElementById(zapatilla_der+i).style.backgroundImage = "url(../assets/vestimentas/" + json.img;
    document.getElementById(zapatilla_der+i).style.display = "block";
}
