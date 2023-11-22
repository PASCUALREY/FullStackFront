const BASE_URL = "http://localhost:5000";

window.onload = function () {
  getUsername();
}
function getUsername() {
  // Obtener el token de localStorage
  const token = sessionStorage.getItem('token');
  const username = sessionStorage.getItem('username');


  document.getElementById("usuario").innerHTML += username;
}


function getCharacter(){
    const seleccion = document.getElementById("personaje");
    const radioButtons = seleccion.querySelector('input[name="rostro"]:checked');
    const idRostro = radioButtons.id;
    const characterName = radioButtons.value;
    sessionStorage.setItem("idCharacter",idRostro);
    sessionStorage.setItem("characterName",characterName);
    window.location.href="../html/vestir.html";
}


document.addEventListener("DOMContentLoaded", function () {

  const token = sessionStorage.getItem('token');

  fetch(BASE_URL+'/api/personajes', {
      headers: { Authorization: token }
  })
      // Exito
      .then(response => response.json())  // convertir a json
      .then(json => mostrarCharacters(json))    //imprimir los datos en la consola

  function mostrarCharacters(json) {
      json.forEach(objeto => {
          console.log(objeto);
          contenedor = document.getElementById("personaje");
          div = document.createElement("div");
          div.classList.add("personaje");
          let img = new Image();
          img.src = `../assets/personajes/${objeto.faceImg}`;
          img.classList.add("rostros");
          div.appendChild(img);
          const label = document.createElement("label");
          label.innerHTML = `<input type="radio" id="${objeto._id}" name="rostro" value="${objeto.name}">${objeto.name}`;
          contenedor.appendChild(label);
          contenedor.appendChild(div);
      });
  }

})
