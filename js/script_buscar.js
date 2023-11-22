let personajeActual = 1;
let totalPersonajes = 0;

function getPersonajes() {
    const token = sessionStorage.getItem('token');
    fetch('http://localhost:5000/api/login/usuarios/buscar', {
        headers: { Authorization: token }
    })
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => buscarPersonajes(json))    //imprimir los datos en la consola
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

function buscarPersonajes(json) {
    var player = json.players;
    const claves = Object.keys(player);
    // Obtener la longitud del array de claves (y, por lo tanto, del objeto JSON)
    totalPersonajes = claves.length;

    console.log('Longitud del JSON:', totalPersonajes);
    document.getElementById("labelVariable1").innerHTML = totalPersonajes;

    if (totalPersonajes != 0) {
        const token = sessionStorage.getItem('token');
        fetch("http://localhost:5000/api/jugadores/" + player[personajeActual-1]._id, {
            headers: { Authorization: token },
        })
            .then(response => response.json())  // convertir a json
            .then(json => {
                mostrarPersonaje(json);
                buscarRostro(json);
                buscarSuperior(json);
                buscarInferior(json);
                buscarCalzado(json);
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });
    }
    else {
        window.alert("No posee personajes cargados")
    }
};



function buscarSuperior(json) {
    const token = sessionStorage.getItem('token');
    fetch("http://localhost:5000/api/vestimenta/" + json.superior, {
        headers: { Authorization: token },
    })
        .then(response => response.json())  // convertir a json
        .then(json => mostrarSuperior(json))
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

function buscarRostro(json) {
    const token = sessionStorage.getItem('token');
    fetch("http://localhost:5000/api/personajes/" + json.character, {
        headers: { Authorization: token },
    })
        .then(response => response.json())  // convertir a json
        .then(json => mostrarRostro(json))
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

function buscarInferior(json) {
    const token = sessionStorage.getItem('token');
    fetch("http://localhost:5000/api/vestimenta/" + json.inferior, {
        headers: { Authorization: token },
    })
        .then(response => response.json())  // convertir a json
        .then(json => mostrarInferior(json))
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

function buscarCalzado(json) {
    const token = sessionStorage.getItem('token');
    fetch("http://localhost:5000/api/vestimenta/" + json.calzado, {
        headers: { Authorization: token },
    })
        .then(response => response.json())  // convertir a json
        .then(json => mostrarCalzado(json))
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

function mostrarSuperior(json) {
    document.getElementById("remera").style.backgroundImage = "url(../assets/vestimentas/" + json.img;
    document.getElementById("remera").style.display = "block";
}

function mostrarInferior(json) {
    document.getElementById("pantalon").style.backgroundImage = "url(../assets/vestimentas/" + json.img;
    document.getElementById("pantalon").style.display = "block";
}

function mostrarCalzado(json) {
    document.getElementById("zapatilla-izq").style.backgroundImage = "url(../assets/vestimentas/" + json.img;
    document.getElementById("zapatilla-izq").style.display = "block";
    document.getElementById("zapatilla-der").style.backgroundImage = "url(../assets/vestimentas/" + json.img;
    document.getElementById("zapatilla-der").style.display = "block";
}

function mostrarPersonaje(json) {
    console.log(json.name);
    document.getElementById("nombre").innerHTML = json.name;
}

function mostrarRostro(json) {
    document.getElementById('rostro').style.backgroundImage = "url('../assets/personajes/" + json.faceImg + "')";
    document.getElementById('rostro').style.display = "block";
}

function iteracionSiguiente() {
    if (personajeActual < totalPersonajes)
        personajeActual++
    else
        window.alert("No hay mas personajes")
}

function iteracionAnterior() {
    if (personajeActual > 1)
        personajeActual--;
    else
        window.alert("No hay mas personajes")

}

document.addEventListener("DOMContentLoaded", function () {
    function miFuncion() {
        document.getElementById("labelVariable2").innerHTML = personajeActual;
    }
    var intervalo = setInterval(miFuncion, 1000);
    const username = sessionStorage.getItem('username');
    document.getElementById("usuario").innerHTML += username;
});