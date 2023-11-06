window.onload = function () {
    getCharacter();
}

function guardar() {
    let idRostro, idParteArriba, idParteAbajo, idCalzado;
    const nombrePersonaje = prompt("Ingrese el nombre que le quiere asignar al personaje");
    const token = sessionStorage.getItem('token');
    try{
    let seleccion = document.getElementById("content-superior");
    let radioButtons = seleccion.querySelector('input[name="parte-arriba"]:checked');
    idParteArriba = radioButtons.id;
    seleccion = document.getElementById("content-inferior");
    radioButtons = seleccion.querySelector('input[name="parte-abajo"]:checked');
    idParteAbajo = radioButtons.id;
    seleccion = document.getElementById("content-calzado");
    radioButtons = seleccion.querySelector('input[name="parte-calzado"]:checked');
    idCalzado = radioButtons.id;
    idRostro = sessionStorage.getItem("idCharacter");
    }
    catch{
        window.alert("No seleccionó alguna prenda");
        throw new Error("No selecciono alguna prenda");
    }

    const personaje = {
        name: nombrePersonaje,
        character: idRostro,
        superior: idParteArriba,
        inferior: idParteAbajo,
        calzado: idCalzado
    }

    console.log(JSON.stringify(personaje, null, 2));

    fetch('http://localhost:5000/api/jugadores/vestir', {
        method: "POST",
        headers: {
            Authorization: token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(personaje)
    })
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => mostrarDatos(json))    //imprimir los datos en la consola
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
    function mostrarDatos(json) {
        console.log(json);
        window.alert("Personaje guardado exitosamente");
    };
}

function desvestir() {
    document.getElementById('remera').style.display = "none";
    document.getElementById('pantalon').style.display = "none";
    document.getElementById('zapatilla-izq').style.display = "none";
    document.getElementById('zapatilla-der').style.display = "none";
}


function getCharacter() {
    const character = sessionStorage.getItem("characterName");

    document.getElementById('rostro').style.backgroundImage = "url('../assets/personajes/" + character + "_face.jpg')";
    document.getElementById('rostro').style.display = "block";
    const username = sessionStorage.getItem('username');
    document.getElementById("usuario").innerHTML += username;
}




document.addEventListener("DOMContentLoaded", function () {

    const token = sessionStorage.getItem('token');

    fetch('http://localhost:5000/api/vestimenta/buscar/superior', {
        headers: { Authorization: token }
    })
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => mostrarSuperior(json))    //imprimir los datos en la consola
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });

    function mostrarSuperior(json) {
        json.forEach(objeto => {
            contenedor = document.getElementById("content-superior");
            const label = document.createElement("label");
            label.innerHTML = `<input type="radio" id="${objeto._id}" name="parte-arriba" value="${objeto.img}"> ${objeto.name}`;
            contenedor.appendChild(label);
        });
    }

})

document.addEventListener("DOMContentLoaded", function () {
    const token = sessionStorage.getItem('token');
    fetch('http://localhost:5000/api/vestimenta/buscar/inferior', {
        headers: { Authorization: token }
    })
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => mostrarInferior(json))    //imprimir los datos en la consola
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });

    function mostrarInferior(json) {
        json.forEach(objeto => {
            contenedor = document.getElementById("content-inferior");
            const label = document.createElement("label");
            label.innerHTML = `<input type="radio" id="${objeto._id}" name="parte-abajo" value="${objeto.img}"> ${objeto.name}`;
            contenedor.appendChild(label);
        });
    }

})

document.addEventListener("DOMContentLoaded", function () {
    const token = sessionStorage.getItem('token');
    fetch('http://localhost:5000/api/vestimenta/buscar/calzado', {
        headers: { Authorization: token }
    })
        // Exito
        .then(response => response.json())  // convertir a json
        .then(json => mostrarCalzado(json))    //imprimir los datos en la consola
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });

    function mostrarCalzado(json) {
        json.forEach(objeto => {
            contenedor = document.getElementById("content-calzado");
            const label = document.createElement("label");
            label.innerHTML = `<input type="radio" id="${objeto._id}" name="parte-calzado" value="${objeto.img}"> ${objeto.name}`;
            contenedor.appendChild(label);
        });
    }

})


function vestirSuperior() {
    const seleccionSuperior = document.getElementById("content-superior");
    const radioButtons = seleccionSuperior.querySelector('input[name="parte-arriba"]:checked') // 'parte_arriba' es el nombre del grupo de radio buttons
    document.getElementById("remera").style.backgroundImage = "url(../assets/vestimentas/" + radioButtons.value;
    document.getElementById("remera").style.display = "block";
};

function vestirInferior() {
    const seleccionInferior = document.getElementById("content-inferior");
    const radioButtons = seleccionInferior.querySelector('input[name="parte-abajo"]:checked') // 'parte_inferior' es el nombre del grupo de radio buttons
    document.getElementById("pantalon").style.backgroundImage = "url(../assets/vestimentas/" + radioButtons.value;
    document.getElementById("pantalon").style.display = "block";
};

function vestirCalzado() {
    const seleccionCalzado = document.getElementById("content-calzado");
    const radioButtons = seleccionCalzado.querySelector('input[name="parte-calzado"]:checked') // 'parte_calzado' es el nombre del grupo de radio buttons
    document.getElementById("zapatilla-izq").style.backgroundImage = "url(../assets/vestimentas/" + radioButtons.value;
    document.getElementById("zapatilla-izq").style.display = "block";
    document.getElementById("zapatilla-der").style.backgroundImage = "url(../assets/vestimentas/" + radioButtons.value;
    document.getElementById("zapatilla-der").style.display = "block";
};