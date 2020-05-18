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

const url_usuarios = 'https://beacon-utpl.herokuapp.com/api/usuarios';


function cargar_Usuarios(){
	
	fetch(url_usuarios, {mode: 'no-cors'})
	  .then(response => response.json())
	  .then(data => console.log(data));
}





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
        
        //cargarUsuarios();
        cargar_Usuarios();
        /*cargarBeacons();
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
                <td>
                <form action="/eliminarUsuario" method="POST">
                    <input type="text" name="_id" class="form-control" value="${doc.id}" style="display: none;">
                    <button type="submit" class="btn btn-danger">Eliminar</button>
                </form>
                </td>
            </tr>
            `
        });
    });
    usuarios=1;
}

function nuevoUsuario(){
    limpiar_camposUsuario();
    $('#modal_usuario').modal('show');
    document.getElementById("_idUsuario").value = "null";
    var boton = document.getElementById("btnRegistrarUsuario");
    boton.innerHTML= 'Registrar Usuario';
}
function editarUsuario(id, cedula, nombre, apellido, email){
	$('#modal_usuario').modal('show');
	document.getElementById("_idUsuario").value = id;
    document.getElementById("identificacion").value = cedula;
    document.getElementById("nombres").value = nombre;
    document.getElementById("apellidos").value = apellido;
    document.getElementById("email").value = email;
    
    var boton = document.getElementById("btnRegistrarUsuario");
    boton.innerHTML= 'Actualizar Usuario';
}

function editarPerfil() {
    document.getElementById("email").disabled = false;
    document.getElementById("nombre").disabled = false;
    document.getElementById("apellido").disabled = false;
    document.getElementById("pass").disabled = false;
    document.getElementById("pass1").disabled = false;
}


function nuevoBeacon(){
    limpiar_camposBeacon();
    $('#modal_beacon').modal('show');
    document.getElementById("_idBeacon").value = "null";
    var boton = document.getElementById("btnRegistrarBeacon");
    boton.innerHTML= 'Registrar Beacon';
}

function editarBeacon(id, UID, codigo, estado, notificacion, protocolo){
	$('#modal_beacon').modal('show');
	document.getElementById("_idBeacon").value = id;
    document.getElementById("UID").value = UID;
    document.getElementById("codigo_beacon").value = codigo;
    document.getElementById("estado").value = estado;
    document.getElementById("notificacion").value = notificacion;
    document.getElementById("protocolo").value = protocolo;
    var boton = document.getElementById("btnRegistrarBeacon");
    boton.innerHTML= 'Actualizar beacon';
}



function nuevoNotificacion(){
    limpiar_camposNotificacion();
    $('#modal_notificacion').modal('show');
    document.getElementById("_idNotificacion").value = "null";
    var boton = document.getElementById("btnRegistrarNotificacion");
    boton.innerHTML= 'Registrar Notificacion';
}

function editarNotificacion(id, tipo, descripcion){
	$('#modal_notificacion').modal('show');
	document.getElementById("_idNotificacion").value = id;
    document.getElementById("tipo").value = tipo;
    document.getElementById("descripcion").value = descripcion;
    var boton = document.getElementById("btnRegistrarNotificacion");
    boton.innerHTML= 'Actualizar Notificación';
}

function nuevoArea(){
    limpiar_camposArea();
    $('#modal_area').modal('show');
    document.getElementById("_idArea").value = "null";
    var boton = document.getElementById("btnRegistrarArea");
    boton.innerHTML= 'Registrar Área';
}

function editarArea(id, descripcion, piso, referencia){
	$('#modal_area').modal('show');
	document.getElementById("_idArea").value = id;
    document.getElementById("piso").value = piso;
    document.getElementById("descripcion_area").value = descripcion;
    document.getElementById("referencia").value = referencia;
    var boton = document.getElementById("btnRegistrarArea");
    boton.innerHTML= 'Actualizar Área';
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
                <td><form action="/eliminarBeacon" method="POST">
                    <input type="text" name="_id" class="form-control" value="${doc.id}" style="display: none;">
                    <button type="submit" class="btn btn-danger">Eliminar</button>
                </form>	</td>
            </tr>
            `
        });
    });
    beacons=1;
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
                <td>
                <form action="/eliminarNotificacion" method="POST">
                    <input type="text" name="_id" class="form-control" value="${doc.id}" style="display: none;">
                    <button type="submit" class="btn btn-danger">Eliminar</button>
                </form>	
                </td>	
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
                <td><form action="/eliminarArea" method="POST">
                    <input type="text" name="_id" class="form-control" value="${doc.id}" style="display: none;">
                    <button type="submit" class="btn btn-danger">Eliminar</button>
                </form>	</td>
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