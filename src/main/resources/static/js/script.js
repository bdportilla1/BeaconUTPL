var db;
var tabla_usuarios;
var tabla_beacons;
var combo_tiposNotificacion;
var combo_pisos;
var combo_areas;

var usuarios=0;
var areas=0;
var beacons=0;
var notificaciones=0;



$(document).ready(function(){
	var config={
		    apiKey: "AIzaSyB4QyvTEJ4Zq0cwkqJtAOz9Zx-7Y7RbXS8",
		    authDomain: "beaconinformation-aed2b.firebaseapp.com",
		    databaseURL: "https://beaconinformation-aed2b.firebaseio.com",
		    projectId: "beaconinformation-aed2b",
		    storageBucket: "beaconinformation-aed2b.appspot.com",
		    messagingSenderId: "295468729488",
		    appId: "1:295468729488:web:2d9ed971cbb3f545b2c415",
		    measurementId: "G-GY8111HWXR"
		};

		firebase.initializeApp(config);
		db = firebase.firestore();

        tabla_usuarios = document.getElementById("tabla_usuarios");
        tabla_beacons = document.getElementById("tabla_beacons");
        combo_tiposNotificacion = document.getElementById("tipo"); 
        combo_pisos = document.getElementById("piso"); 
        combo_areas = document.getElementById("referencia"); 
        
        
        /*
		cargarUsuarios();
        cargarBeacons();
        cargarNotificaciones();
        cargarAreas();*/



        //observador();
        





});


function cargarUsuarios(){
    db.collection("usuarios").onSnapshot((querySnapshot) => {
        cont =0;
        tabla_usuarios.innerHTML='';
        querySnapshot.forEach((doc) => {
            cont = cont+1;
            tabla_usuarios.innerHTML += `
            <tr>
                <th scope="row">`+ cont +` </th>
                <td>${doc.data().cedula}</td>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellido}</td>
                <td>${doc.data().email}</td>
                <td><button class="btn btn-warning" onclick="editarUsuario('${doc.id}', '${doc.data().cedula}', '${doc.data().nombre}', '${doc.data().apellido}', '${doc.data().email}')" >Editar</button></td>
                <td><button class="btn btn-danger" onclick="eliminarUsuario('${doc.id}')">Eliminar</button></td>
            </tr>
            `
        });
    });
    usuarios=1;
}

function guardarUsuario(){
    var cedula = document.getElementById("identificacion").value;
    var email = document.getElementById("email").value;
    var nombre = document.getElementById("nombres").value;
    var apellido = document.getElementById("apellidos").value;
    var pass = document.getElementById("pass").value;
    db.collection("usuarios").add({
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        email: email
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        limpiar_camposUsuario();
        $('#modal_usuario').modal('hide');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function editarUsuario(id, cedula, nombre, apellido, email){
	$('#modal_usuario').modal('show');
    document.getElementById("identificacion").value = cedula;
    document.getElementById("nombres").value = nombre;
    document.getElementById("apellidos").value = apellido;
    document.getElementById("email").value = email;
    
    var boton = document.getElementById("btnRegistrarUsuario");
    boton.innerHTML= 'Actualizar Usuario';
    boton.onclick= function(){
        var ref = db.collection("usuarios").doc(id);
        var cedula = document.getElementById("identificacion").value;
        var nombre = document.getElementById("nombres").value;
        var apellido = document.getElementById("apellidos").value;
        var email = document.getElementById("email").value;
        
        return ref.update({
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            email: email
        })
        .then(function() {
            console.log("Document successfully written!");
            boton.innerHTML="Registar Usuario";
            $('#modal_usuario').modal('hide');
            boton.onclick= function(){
                guardarUsuario();
            };
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
}
function eliminarUsuario(id){
    db.collection("usuarios").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}







function nuevoUsuario(){
    limpiar_camposUsuario();
    $('#modal_usuario').modal('show');
    var boton = document.getElementById("btnRegistrarUsuario");
    boton.innerHTML= 'Registrar Usuario';
}

function nuevoBeacon(){
    limpiar_camposBeacon();
    $('#modal_beacon').modal('show');
    var boton = document.getElementById("btnRegistrarBeacon");
    boton.innerHTML= 'Registrar Beacon';
}
function nuevoNotificacion(){
    limpiar_camposNotificacion();
    $('#modal_notificacion').modal('show');
    var boton = document.getElementById("btnRegistrarNotificacion");
    boton.innerHTML= 'Registrar Notificacion';
}
function nuevoArea(){
    limpiar_camposArea();
    $('#modal_area').modal('show');
    var boton = document.getElementById("btnRegistrarArea");
    boton.innerHTML= 'Registrar Área';
}

function cargarBeacons(){
    db.collection("beacons").onSnapshot((querySnapshot) => {
        var cont=0;
        tabla_beacons.innerHTML='';
        querySnapshot.forEach((doc) => {
            cont = cont +1;
            tabla_beacons.innerHTML += `
            <tr>
            <th scope="row">`+ cont +` </th>
                <td>${doc.data().UID}</td>
                <td>${doc.data().codigo}</td>
                <td>${doc.data().estado}</td>
                <td>${doc.data().notificacion}</td>
                <td>${doc.data().protocolo}</td>
                <td><button class="btn btn-warning" onclick="editarBeacon('${doc.id}', '${doc.data().UID}', '${doc.data().codigo}', '${doc.data().estado}', '${doc.data().notificacion}', '${doc.data().protocolo}')" >Editar</button></td>
                <td><button class="btn btn-danger" onclick="eliminarBeacon('${doc.id}')">Eliminar</button></td>
            </tr>
            `
        });
    });
    beacons=1;
}
function guardarBeacon(){
    var UID = document.getElementById("UID").value;
    var codigo = document.getElementById("codigo_beacon").value;
    var estado = document.getElementById("estado").value;
    var notificacion = document.getElementById("notificacion").value;
    var protocolo = document.getElementById("protocolo").value;
    db.collection("beacons").add({
        UID: UID,
        codigo: codigo,
        estado: estado,
        notificacion: notificacion,
        protocolo: protocolo
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        limpiar_camposBeacon();
        $('#modal_beacon').modal('hide');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function editarBeacon(id, UID, codigo, estado, notificacion, protocolo){
	$('#modal_beacon').modal('show');
    document.getElementById("UID").value = UID;
    document.getElementById("codigo_beacon").value = codigo;
    document.getElementById("estado").value = estado;
    document.getElementById("notificacion").value = notificacion;
    document.getElementById("protocolo").value = protocolo;
    var boton = document.getElementById("btnRegistrarBeacon");
    boton.innerHTML= 'Actualizar beacon';
    boton.onclick= function(){
        var ref = db.collection("beacons").doc(id);
        var UID = document.getElementById("UID").value;
        var codigo = document.getElementById("codigo_beacon").value;
        var estado = document.getElementById("estado").value;
        var notificacion = document.getElementById("notificacion").value;
        var protocolo = document.getElementById("protocolo").value;
        return ref.update({
            UID: UID,
            codigo: codigo,
            estado: estado,
            notificacion: notificacion,
            protocolo: protocolo
        })
        .then(function() {
            console.log("Document successfully written!");
            boton.innerHTML="Registar Beacon";
            $('#modal_beacon').modal('hide');
            boton.onclick= function(){
                guardarBeacon();
            };
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
}
function eliminarBeacon(id){
    db.collection("beacons").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function cargarNotificaciones(){
    db.collection("notificaciones").onSnapshot((querySnapshot) => {
        var cont=0;
        tabla_notificaciones.innerHTML='';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            cont = cont +1;
            tabla_notificaciones.innerHTML += `
            <tr>
            <th scope="row">`+ cont +` </th>
                <th scope="row">${doc.data().tipo}</th>
                <td>${doc.data().descripcion}</td>
                <td><button class="btn btn-warning" onclick="editarNotificacion('${doc.id}', '${doc.data().tipo}', '${doc.data().descripcion}')" >Editar</button></td>
                <td><button class="btn btn-danger" onclick="eliminarNotificacion('${doc.id}')">Eliminar</button></td>
            </tr>
            `
        });
    });
    db.collection("tipos_alertas").onSnapshot((querySnapshot) => {
        combo_tiposNotificacion.innerHTML='';
        querySnapshot.forEach((doc) => {
            combo_tiposNotificacion.innerHTML += `
            <option>${doc.data().nombre_alerta}</option>
            `
        });
    });
    notificaciones=0;
}
function guardarNotificacion(){
    var tipo = document.getElementById("tipo").value;
    var descripcion = document.getElementById("descripcion").value;
    db.collection("notificaciones").add({
        tipo: tipo,
        descripcion: descripcion
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        limpiar_camposNotificacion();
        $('#modal_notificacion').modal('hide');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
function editarNotificacion(id, tipo, descripcion){
	$('#modal_notificacion').modal('show');
    document.getElementById("tipo").value = tipo;
    document.getElementById("descripcion").value = descripcion;
    var boton = document.getElementById("btnRegistrarNotificacion");
    boton.innerHTML= 'Actualizar Notificación';
    boton.onclick= function(){
        var ref = db.collection("notificaciones").doc(id);
        var tipo = document.getElementById("tipo").value;
        var descripcion = document.getElementById("descripcion").value;
        return ref.update({
            tipo: tipo,
            descripcion: descripcion
        })
        .then(function() {
            console.log("Document successfully written!");
            boton.innerHTML="Registar Notificación";
            $('#modal_notificacion').modal('hide');
            boton.onclick= function(){
                guardarNotificacion();
            };
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
}
function eliminarNotificacion(id){
    db.collection("notificaciones").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}



function cargarAreas(){
    db.collection("areas").onSnapshot((querySnapshot) => {
        var cont=0;
        tabla_areas.innerHTML='';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            cont = cont +1;
            tabla_areas.innerHTML += `
            <tr>
            <th scope="row">`+ cont +` </th>
                <td>${doc.data().descripcion}</td>
                <td>${doc.data().piso}</td>
                <td>${doc.data().referencia}</td>
                <td><button class="btn btn-warning" onclick="editarArea('${doc.id}', '${doc.data().descripcion}', '${doc.data().piso}', '${doc.data().referencia}')" >Editar</button></td>
                <td><button class="btn btn-danger" onclick="eliminarArea('${doc.id}')">Eliminar</button></td>
            </tr>
            `
        });
    });
    db.collection("pisos").onSnapshot((querySnapshot) => {
        combo_pisos.innerHTML='';
        querySnapshot.forEach((doc) => {
            combo_pisos.innerHTML += `
            <option>${doc.data().nombre}</option>
            `
        });
    });
    db.collection("nombre_areas").onSnapshot((querySnapshot) => {
        combo_areas.innerHTML='';
        querySnapshot.forEach((doc) => {
            combo_areas.innerHTML += `
            <option>${doc.data().nombre}</option>
            `
        });
    });
    areas=1;
}

function guardarArea(){
    var referencia = document.getElementById("referencia").value;
    var descripcion = document.getElementById("descripcion_area").value;
    var piso = document.getElementById("piso").value;

    db.collection("areas").add({
        referencia: referencia,
        descripcion: descripcion,
        piso: piso
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        limpiar_camposArea();
        $('#modal_area').modal('hide');
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function editarArea(id, descripcion, piso, referencia){
	$('#modal_area').modal('show');
    document.getElementById("piso").value = piso;
    document.getElementById("descripcion_area").value = descripcion;
    document.getElementById("referencia").value = referencia;

    var boton = document.getElementById("btnRegistrarArea");
    boton.innerHTML= 'Actualizar Área';
    boton.onclick= function(){
        var ref = db.collection("areas").doc(id);
        var descripcion = document.getElementById("descripcion_area").value;
        var piso = document.getElementById("piso").value;
        var referencia = document.getElementById("referencia").value;
        
        return ref.update({
            referencia: referencia,
            descripcion: descripcion,
            piso:piso
        })
        .then(function() {
            console.log("Document successfully written!");
            boton.innerHTML="Registar Notificación";
            $('#modal_area').modal('hide');
            boton.onclick= function(){
                guardarArea();
            };
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
}

function eliminarArea(id){
    db.collection("areas").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


  




function registrar(){
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;

    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(function(){
        enviar_correo();
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

}

function ingresar(){
    var email = document.getElementById('email_i').value;
    var pass = document.getElementById('pass_i').value;
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function(){
        console.log("TE HAS LOGUEADO");

    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("existe usuario activo");
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          // para verificar correo
          console.log(user.emailVerified);
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          console.log("no existe usuario activo");
          // ...
        }
      });
}

function salir(){
    firebase.auth().signOut()
    .then(function(){
        console.log("Saliendo");

    })
    .catch(function(error){
        console.log(error)
    })
}

function enviar_correo(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
    // Email sent.
        console.log("Enviando correo verificacion");
    }).catch(function(error) {
    // An error happened.
        console.log(error);
    });
}
//

function limpiar_camposBeacon(){
    document.getElementById("UID").value = "";
    document.getElementById("codigo_beacon").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("notificacion").value ="";
    document.getElementById("protocolo").value = "";
}
function limpiar_camposNotificacion(){
    document.getElementById("tipo").value = "";
    document.getElementById("descripcion").value = "";
}
function limpiar_camposArea(){
    document.getElementById("referencia").value = "";
    document.getElementById("piso").value = "";
    document.getElementById("descripcion_area").value = "";
}
function limpiar_camposUsuario(){
    document.getElementById("identificacion").value = "";
    document.getElementById("email").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("pass1").value = "";
}



function mostrarAdUsuarios(){
    if(usuarios ==0){
        cargarUsuarios();
    }
    //Panel principal
    $('#administrar').hide();
    // Administracion
    $('#gestion_usuarios').show();
    $('#gestion_beacons').hide();
    $('#gestion_notificaciones').hide();
    $('#gestion_areas').hide();
}
function mostrarAdBeacons(){
	if(beacons ==0){
        cargarBeacons();
    }
    //Panel principal
    $('#administrar').hide();
    // Administracion
    $('#gestion_usuarios').hide();
    $('#gestion_beacons').show();
    $('#gestion_notificaciones').hide();
    $('#gestion_areas').hide();
}
function mostrarAdNotificaciones(){
	if(notificaciones ==0){
        cargarNotificaciones();
    }
    //Panel principal
    $('#administrar').hide();
    // Administracion
    $('#gestion_usuarios').hide();
    $('#gestion_beacons').hide();
    $('#gestion_notificaciones').show();
    $('#gestion_areas').hide();
}
function mostrarAdAreas(){
	if(areas ==0){
        cargarAreas();
    }
    //Panel principal
    $('#administrar').hide();
    // Administracion
    $('#gestion_usuarios').hide();
    $('#gestion_beacons').hide();
    $('#gestion_notificaciones').hide();
    $('#gestion_areas').show();
}
function volver(){
    //Panel principal
    $('#administrar').show();
    // Administracion
    $('#gestion_usuarios').hide();
    $('#gestion_beacons').hide();
    $('#gestion_notificaciones').hide();
    $('#gestion_areas').hide();
}