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
var db = firebase.firestore();

//var tabla = document.getElementById("tabla");

function cargarUsuarios(){
    db.collection("usuarios").onSnapshot((querySnapshot) => {
        tabla.innerHTML="";
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
    
            tabla.innerHTML += `
            <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().cedula}</td>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellido}</td>
                <td><button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().cedula}', '${doc.data().nombre}', '${doc.data().apellido}')" >Editar</button></td>
                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            </tr>
            `
            
        });
    });

}



function guardar(){
    var cedula = document.getElementById("cedula").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
 
    db.collection("usuarios").add({
        cedula: cedula,
        nombre: nombre,
        apellido: apellido
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("cedula").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

}
  
//Eliminar registro
function eliminar(id){
    db.collection("usuarios").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}

function editar(id, cedula, nombre, apellido){
    document.getElementById("cedula").value = cedula;
    document.getElementById("nombre").value = nombre;
    document.getElementById("apellido").value = apellido;
    var boton = document.getElementById("btnGuardar");
    boton.innerHTML= 'Actualizar';
    boton.onclick= function(){
        var usuarioRef = db.collection("usuarios").doc(id);

        var cedula = document.getElementById("cedula").value;
        var nombre = document.getElementById("nombre").value;
        var apellido = document.getElementById("apellido").value;
        return usuarioRef.update({
            cedula: cedula,
            nombre: nombre,
            apellido: apellido
        })
        .then(function() {
            console.log("Document successfully written!");
            boton.innerHTML="Guardar";
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
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
observador();