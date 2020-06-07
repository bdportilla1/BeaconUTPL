var db;
var storage;
var storageRef;

var tabla_usuarios;
var tabla_beacons;
var combo_tiposNotificacion;
var combo_pisos;
var combo_areas;

var combo_areasDisponibles;



const url_usuarios = 'https://beacon-utpl.herokuapp.com/api/usuarios';
const url_beacons = 'https://beacon-utpl.herokuapp.com/api/beacons';
const url_areas = 'https://beacon-utpl.herokuapp.com/api/areas';

const url_areasDisponibles = 'https://beacon-utpl.herokuapp.com/api/areasDisponibles';


function cargar_Usuarios(){
	fetch(url_usuarios)
    .then(res => res.json())
    .then((datos) => {
       console.log(datos);
       cont =0;
       tabla_usuarios.innerHTML='';
		for(let valor of datos){
			console.log(valor.nombre);
			cont = cont+1;
            tabla_usuarios.innerHTML += `
            <tr>
                <th scope="row">`+ cont +` </th>
                <td>${valor.cedula}</td>
                <td>${valor.nombre}</td>
                <td>${valor.apellido}</td>
                <td>${valor.email}</td>
                <td><button class="btn btn-warning" onclick="editarUsuario('${valor.cedula}', '${valor.cedula}', '${valor.nombre}', '${valor.apellido}', '${valor.email}')" >Editar</button></td>
                <td>
                <form action="/eliminarUsuario" method="POST">
                    <input type="text" name="_id" class="form-control" value="${valor.cedula}" style="display: none;">
                    <button type="submit" class="btn btn-danger">Eliminar</button>
                </form>
                </td>
            </tr>
            `
		}
    }).catch(err => console.error(err));
}

function cargar_Beacons(){

    fetch(url_beacons)
    .then(res => res.json())
    .then((datos) => {
      
       cont =0;
       tabla_beacons.innerHTML='';
		for(let valor of datos){
			console.log(valor.uid);
            cont = cont+1;
       
                if(valor.estado!=null){
                    tabla_beacons.innerHTML += `
                    <tr>
		                <th scope="row">`+ cont +` </th>
	                    <td>${valor.uid}</td>
	                    <td>${valor.codigo}</td>
	                    <td>${valor.estado}</td>
	                    <td>${valor.notificacion}</td>
	                    <td>${valor.protocolo}</td>
	                    <td><form action="/eliminarAsignacion" method="POST">
                        	<input type="text" name="_id" class="form-control" value="${valor.uid}" style="display: none;">
                        	<button type="submit" class="btn btn-danger">Quitar</button>
		                </form></td>
		                <td><button class="btn btn-warning" onclick="editarBeacon('${valor.uid}', '${valor.uid}', '${valor.codigo}', '${valor.estado}', '${valor.notificacion}', '${valor.protocolo}')" >Editar</button></td>
                        <td><form action="/eliminarBeacon" method="POST">
                            <input type="text" name="_id" class="form-control" value="${valor.uid}" style="display: none;">
                            <button type="submit" class="btn btn-danger">Eliminar</button>
                        </form>	</td>
                    </tr>
                    `
                }else{
                    tabla_beacons.innerHTML += `
                    <tr>
	                    <th scope="row">`+ cont +` </th>
                        <td>${valor.uid}</td>
                        <td>${valor.codigo}</td>
                        <td>-</td>
                        <td>${valor.notificacion}</td>
                        <td>${valor.protocolo}</td>
	                    <td><button class="btn btn-success" onclick="vincularArea('${valor.uid}')" >Asignar</button></td>
                        <td><button class="btn btn-warning" onclick="editarBeacon('${valor.uid}', '${valor.uid}', '${valor.codigo}', '${valor.estado}', '${valor.notificacion}', '${valor.protocolo}')" >Editar</button></td>
                        <td><form action="/eliminarBeacon" method="POST">
                            <input type="text" name="_id" class="form-control" value="${valor.uid}" style="display: none;">
                            <button type="submit" class="btn btn-danger">Eliminar</button>
                        </form>	</td>
                    </tr>
                    `
                }
 
		}
    }).catch(err => console.error(err));
}
function cargar_Areas(){
    tabla_areas.innerHTML='';
    fetch(url_areas)
    .then(res => res.json())
    .then((datos) => {
        cont =0;

		for(let valor of datos){
            cont = cont+1;
            
            tabla_areas.innerHTML += `
            <tr>
            <th scope="row">`+ cont +` </th>
                <td>${valor.nombre}</td>
                <td>${valor.descripcion}</td>
                <td>${valor.piso}</td>
                <td>${valor.estado}</td>
                <td><button class="btn btn-warning" onclick="editarArea('${valor.codigo}', '${valor.nombre}', '${valor.descripcion}', '${valor.piso}', '${valor.estado}')" >Editar</button></td>
                <td><form action="/eliminarArea" method="POST">
                    <input type="text" name="_id" class="form-control" value="${valor.codigo}" style="display: none;">
                    <button type="submit" class="btn btn-danger">Eliminar</button>
                </form>	</td>
            </tr>
            `
		}
    }).catch(err => console.error(err));

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
		storageRef = firebase.storage().ref();
	

        tabla_usuarios = document.getElementById("tabla_usuarios");
        tabla_beacons = document.getElementById("tabla_beacons");
        combo_tiposNotificacion = document.getElementById("tipo"); 
        combo_pisos = document.getElementById("piso"); 
        combo_areas = document.getElementById("referencia"); 

        combo_areasDisponibles = document.getElementById("areas_disponibles");
        
        //cargarUsuarios();
        //cargar_Usuarios();
        cargar_Beacons();
        cargar_Areas();
        /*cargarBeacons();
        cargarNotificaciones();*/
        //cargarAreas();
     

});

function guardarImg(){
    var file = document.getElementById("imgArea");
    var img_subir = file.files[0];
    var upload = storageRef.child('img/'+ img_subir.name).put(img_subir);
}

function subirImg(){
	var file = document.getElementById("imgArea");
	var img_subir = file.files[0];
	var nombreImgEncode= encodeURI(img_subir.name);
	var p1 = "https://firebasestorage.googleapis.com/v0/b/beaconinformation-aed2b.appspot.com/o/img%2F"+nombreImgEncode +"?alt=media";
    //console.log(img_subir.name);
    //console.log(p1);
    var upload = storageRef.child('img/'+ img_subir.name).put(img_subir);
    document.getElementById("url").value=p1;
}


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

function vincularArea(id){
	$('#modal_beacon_asignar').modal('show');
    document.getElementById("_idBeaconAsignar").value = id;
    combo_areasDisponibles.innerHTML='';
    fetch(url_areasDisponibles)
    .then(res => res.json())
    .then((datos) => {
		for(let valor of datos){
            combo_areasDisponibles.innerHTML += `
            <option value="${valor.codigo}" >${valor.nombre}</option>
            `
		}
    }).catch(err => console.error(err));

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

function editarArea(id, nombre, descripcion, piso, referencia){
	$('#modal_area').modal('show');
    document.getElementById("_idArea").value = id;
    document.getElementById("nombre_area").value = nombre;
    document.getElementById("piso").value = piso;
    document.getElementById("descripcion_area").value = descripcion;
    document.getElementById("referencia").value = referencia;
    var boton = document.getElementById("btnRegistrarArea");
    boton.innerHTML= 'Actualizar Área';
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
                <td>${doc.data().nombre}</td>
                <td>${doc.data().descripcion}</td>
                <td>${doc.data().piso}</td>
                <td>${doc.data().referencia}</td>
                <td><button class="btn btn-warning" onclick="editarArea('${doc.id}', '${doc.data().nombre}', '${doc.data().descripcion}', '${doc.data().piso}', '${doc.data().referencia}')" >Editar</button></td>
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