const BASE_URL = "https://juegovestir-api.onrender.com";

function inicioSesion() {
    // Datos de inicio de sesión
    const usuario = document.getElementById("username").value;
    const contraseña = document.getElementById("password").value;

    // URL del endpoint de inicio de sesión
    const urlInicioSesion = BASE_URL+"/api/login";

    // Objeto con los datos a enviar
    const datosInicioSesion = {
        name: usuario,
        pin: contraseña,
    };

    const datosInicioSesionString = JSON.stringify(datosInicioSesion); //When sending data to a web server, the data has to be a string

    // Configuración de la solicitud
    const configuracion = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: datosInicioSesionString,
    };

    // Realizar la solicitud fetch
    fetch(urlInicioSesion, configuracion)
        .then(response => {
            if (response.status === 401) { //Porque fetch toma al 401 como valido y no error.
                window.alert("Clave o Usuario Incorrecto");
                throw new Error("Unauthorized - Revise las credenciales");
            }
            return response.json();
        })
        .then(data => {
            // Maneja la respuesta del servidor
            console.log(data);
            sessionStorage.setItem('token', data);
            sessionStorage.setItem('username', usuario);
            window.location.href="../html/seleccion.html"
        })
        .catch(error => {
            // Maneja errores
            console.log("Error en la solicitud:", error);
        });
}

