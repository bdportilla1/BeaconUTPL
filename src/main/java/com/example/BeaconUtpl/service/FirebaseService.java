package com.example.BeaconUtpl.service;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

import com.example.BeaconUtpl.Entities.Area;
import com.example.BeaconUtpl.Entities.Asignacion;
import com.example.BeaconUtpl.Entities.Beacon;
import com.example.BeaconUtpl.Entities.Notificacion;
import com.example.BeaconUtpl.Entities.Usuario;
import com.google.api.client.util.Base64;
//import com.google.api.client.repackaged.org.apache.commons.codec.binary.Base64;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;

@Service
public class FirebaseService {
	
	public void guardarUsuario(String _id, Usuario usuario) throws InterruptedException, ExecutionException {
		//Seteando el objeto Usuario
		Firestore dbFirestore = FirestoreClient.getFirestore();
		
		
		Map<String, Object> docData = new HashMap<>();
		docData.put("cedula", usuario.getCedula());
		docData.put("nombre", usuario.getNombre() );
		docData.put("apellido", usuario.getApellido());
		docData.put("email", usuario.getEmail());
		docData.put("pass", Encriptar(usuario.getPass()));
		if(_id.equals("null")) {
			//guardar documento nuevo
			ApiFuture<WriteResult> future = dbFirestore.collection("usuarios").document(usuario.getCedula()).set(docData);
		}else {	
			//actualizar documento
			ApiFuture<WriteResult> writeResult =
			dbFirestore
			        .collection("usuarios")
			        .document(_id)
			        .set(docData, SetOptions.merge());
		}
	}
	
	public List<Usuario> getUsuarios() throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ArrayList<Usuario> returnArray = new ArrayList();
		ApiFuture<QuerySnapshot> future = dbFirestore.collection("usuarios").get();
		// future.get() blocks on response
		List<QueryDocumentSnapshot> documents = future.get().getDocuments();
		for (DocumentSnapshot document : documents) {
			returnArray.add(document.toObject(Usuario.class));
			//System.out.println(document.getId() + " => " + document.toObject(Usuario.class));
		}
		return returnArray;
	}
	public List<Notificacion> getNotificaciones() throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ArrayList<Notificacion> returnArray = new ArrayList();
		ApiFuture<QuerySnapshot> future = dbFirestore.collection("notificaciones").get();
		// future.get() blocks on response
		List<QueryDocumentSnapshot> documents = future.get().getDocuments();
		for (DocumentSnapshot document : documents) {
			returnArray.add(document.toObject(Notificacion.class));
			//System.out.println(document.getId() + " => " + document.toObject(Usuario.class));
		}
		return returnArray;
	}
	
	public List<Beacon> getBeacons() throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ArrayList<Beacon> returnArray = new ArrayList();
		ApiFuture<QuerySnapshot> future = dbFirestore.collection("beacons").get();
		// future.get() blocks on response
		List<QueryDocumentSnapshot> documents = future.get().getDocuments();
		for (DocumentSnapshot document : documents) {
			returnArray.add(document.toObject(Beacon.class));
			//System.out.println(document.getId() + " => " + document.toObject(Usuario.class));
		}
		return returnArray;
	}
	
	public List<Area> getAreas() throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ArrayList<Area> returnArray = new ArrayList();
		Area objArea = new Area();
		ApiFuture<QuerySnapshot> future = dbFirestore.collection("areas").get();
		// future.get() blocks on response
		List<QueryDocumentSnapshot> documents = future.get().getDocuments();
		for (DocumentSnapshot document : documents) {
			objArea = document.toObject(Area.class);
			String codigo = document.getId();
			objArea.setCodigo(codigo);
			
			System.out.println(codigo);
			returnArray.add(objArea);
			//System.out.println(document.getId() + " => " + document.toObject(Usuario.class));
		}
		return returnArray;
	}
	
	
	public List<Area> getAreasDisponibles() throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ArrayList<Area> returnArray = new ArrayList();
		Area objArea = new Area();
		ApiFuture<QuerySnapshot> future = dbFirestore.collection("areas").get();
	
		List<QueryDocumentSnapshot> documents = future.get().getDocuments();
		for (DocumentSnapshot document : documents) {
			objArea = document.toObject(Area.class);
			if(objArea.getEstado().equals("Disponible")) {
				String codigo = document.getId();
				objArea.setCodigo(codigo);
				returnArray.add(objArea);
			}
		}
		return returnArray;
	}
	
	
	public List<Asignacion> getAsignaciones() throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		String beacon;
		String area;
		
		Asignacion returnAsignacion = new Asignacion();		
		
		ArrayList<Asignacion> returnArray = new ArrayList();
		ApiFuture<QuerySnapshot> future = dbFirestore.collection("asignaciones").get();
		// future.get() blocks on response
		List<QueryDocumentSnapshot> documents = future.get().getDocuments();
		for (DocumentSnapshot document : documents) {
			
			beacon = document.get("beacon").toString();
			area = document.get("area").toString();
			
	
			// Se obtiene la referencia de BEACON Apartir de asignaciones
			DocumentReference docRefBeacon = dbFirestore.collection("beacons").document(beacon);
			ApiFuture<DocumentSnapshot> beaconFuture = docRefBeacon.get();
			DocumentSnapshot beaconObjeto = beaconFuture.get();
			
			DocumentReference docRefArea = dbFirestore.collection("areas").document(area);
			ApiFuture<DocumentSnapshot> areaFuture = docRefArea.get();
			DocumentSnapshot areaObjeto = areaFuture.get();
			
			// Setear los objetos en la clase asignacion
		
			returnAsignacion.setObjBeacon(beaconObjeto.toObject(Beacon.class));
			returnAsignacion.setObjArea(areaObjeto.toObject(Area.class));
			returnAsignacion.getObjArea().setCodigo(area);
			
			returnAsignacion.setArea(area);
			returnAsignacion.setBeacon(beacon);
			
			
			// Se agrega a la lista de asignaciones
			returnArray.add(returnAsignacion);
			
			
			
		}
		return returnArray;
	}
	
	
	
	
	
	public void guardarArea(String _id, Area area) throws InterruptedException, ExecutionException {
		//Seteando el objeto Area
		Firestore dbFirestore = FirestoreClient.getFirestore();

		Map<String, Object> docData = new HashMap<>();
		docData.put("nombre", area.getNombre());
		docData.put("descripcion", area.getDescripcion());
		docData.put("piso", area.getPiso());
		docData.put("estado", area.getEstado());
		if(!area.getUrl().equals("")) {
			docData.put("url", area.getUrl());
		}
		
		if(_id.equals("null")) {
			//guardar documento nuevo
			ApiFuture<WriteResult> future = dbFirestore.collection("areas").document().set(docData);
			
		}else {	
			//actualizar documento
			ApiFuture<WriteResult> writeResult =
			dbFirestore
			        .collection("areas")
			        .document(_id)
			        .set(docData, SetOptions.merge());
		}
	}
	
	public void guardarBeacon(String _id, Beacon beacon) throws InterruptedException, ExecutionException {
		//Seteando el objeto Beacon
		Firestore dbFirestore = FirestoreClient.getFirestore();
		Map<String, Object> docData = new HashMap<>();
		docData.put("codigo", beacon.getCodigo());
		docData.put("notificacion", beacon.getNotificacion());
	
		if(_id.equals("null")) {
			//guardar documento nuevo
			docData.put("UID", beacon.getUID());
			docData.put("estado", null);
			
			ApiFuture<WriteResult> future = dbFirestore.collection("beacons").document(beacon.getUID()).set(docData);
		}else {	
			//actualizar documento
			ApiFuture<WriteResult> writeResult =
			dbFirestore
			        .collection("beacons")
			        .document(_id)
			        .set(docData, SetOptions.merge());
		}
	}

	public void guardarNotificacion(String _id, Notificacion notificacion) throws InterruptedException, ExecutionException {
		//Seteando el objeto Notificacion
		Firestore dbFirestore = FirestoreClient.getFirestore();
		Map<String, Object> docData = new HashMap<>();
		docData.put("tipo", notificacion.getTipo());
		docData.put("descripcion", notificacion.getDescripcion());
		if(_id.equals("null")) {
			//guardar documento nuevo
			ApiFuture<WriteResult> future = dbFirestore.collection("notificaciones").document().set(docData);
		}else {	
			//actualizar documento
			ApiFuture<WriteResult> writeResult =
			dbFirestore
			        .collection("notificaciones")
			        .document(_id)
			        .set(docData, SetOptions.merge());
		}
	}
	
	
	
	public void guardarAsignacion(String _idBeacon, String _idArea) throws InterruptedException, ExecutionException {
		//Seteando el objeto Usuario
		Firestore dbFirestore = FirestoreClient.getFirestore();
		
		Map<String, Object> docData = new HashMap<>();
		docData.put("beacon", _idBeacon);
		docData.put("area", _idArea );
		
		
		// Se obtiene referencia del area que se vincula
		DocumentReference docRefArea = dbFirestore.collection("areas").document(_idArea);
		ApiFuture<DocumentSnapshot> areaFuture = docRefArea.get();
		DocumentSnapshot objArea = areaFuture.get();
		
		Map<String, Object> updateBeacon = new HashMap<>();
		updateBeacon.put("estado", objArea.get("nombre"));

		// Se actualiza la asignacion del beacon con el nombre del area
		ApiFuture<WriteResult> writeResult =
		    dbFirestore
		        .collection("beacons")
		        .document(_idBeacon)
		        .set(updateBeacon, SetOptions.merge());
		// ...
		
		
		Map<String, Object> updateArea = new HashMap<>();
		updateArea.put("estado", "No disponible");

		// Se actualiza la asignacion del estado del area
		ApiFuture<WriteResult> writeResult1 =
		    dbFirestore
		        .collection("areas")
		        .document(_idArea)
		        .set(updateArea, SetOptions.merge());
		// ...
		
		ApiFuture<WriteResult> future = dbFirestore.collection("asignaciones").document(_idBeacon).set(docData);

	}
	
	
	
	
	public Usuario validarLogin(String identificacion, String pass) throws Exception {
		Usuario usuario= null;
		
		Firestore dbFirestore = FirestoreClient.getFirestore();
		DocumentReference docRef = dbFirestore.collection("usuarios").document(identificacion);
		// asynchronously retrieve the document
		ApiFuture<DocumentSnapshot> future = docRef.get();
		// ...
		// future.get() blocks on response
		DocumentSnapshot document = future.get();

		if (document.exists()) {
			usuario= document.toObject(Usuario.class);
			if(pass.equals(Desencriptar(usuario.getPass()))) {
				System.out.println("Todo correcto");
				return usuario;
			}else {
				System.out.println("Contraseña incorrecta");
				usuario = null;
			}
		} else {
			System.out.println("No existe usuario");
			usuario = null;
		}
		
		return usuario;
	}
	
	
	
	public void eliminarUsuario(String _id) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ApiFuture<WriteResult> writeResult = dbFirestore.collection("usuarios").document(_id).delete();
	}
	public void eliminarArea(String _id) throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		
		DocumentReference docRef = dbFirestore.collection("areas").document(_id);
		ApiFuture<DocumentSnapshot> areaFuture = docRef.get();
		DocumentSnapshot obj = areaFuture.get();
		
		if(obj.get("estado").toString().equals("Disponible")) {
			ApiFuture<WriteResult> writeResult = dbFirestore.collection("areas").document(_id).delete();
		}
		
		
	}
	public void eliminarBeacon(String _id) throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ApiFuture<WriteResult> writeResult = dbFirestore.collection("beacons").document(_id).delete();
		// Se elimina la asignacion en caso de que el beacon registrado cuente con una
		
		
		DocumentReference docRef = dbFirestore.collection("beacons").document(_id);
		ApiFuture<DocumentSnapshot> areaFuture = docRef.get();
		DocumentSnapshot objBeacon = areaFuture.get();
		
		
		// Si el beacon que se elimina se encontraba vinvulado a un area se cambia el estado del area a disponible
		if(objBeacon.get("estado")!=null){
			// Se ontiene la referencia de la asignacion a eliminar
			DocumentReference docRefAsignacion = dbFirestore.collection("asignaciones").document(_id);
			ApiFuture<DocumentSnapshot> asignacionFuture = docRefAsignacion.get();
			DocumentSnapshot objAsignacion = asignacionFuture.get();
			
			Map<String, Object> updateArea = new HashMap<>();
			updateArea.put("estado", "Disponible");
			// Se actualiza la disponiblidad del area vinculada
			ApiFuture<WriteResult> writeResult2=
			    dbFirestore
			        .collection("areas")
			        .document(objAsignacion.get("area").toString())
			        .set(updateArea, SetOptions.merge());
			// ...
			ApiFuture<WriteResult> writeResult3 = dbFirestore.collection("asignaciones").document(_id).delete();
		}
		
		
		
	}
	public void eliminarNotificacion(String _id) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ApiFuture<WriteResult> writeResult = dbFirestore.collection("notificaciones").document(_id).delete();
	}
	public void eliminarAsignacion(String _id) throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		
		// Se ontiene la referencia de la asignacion a eliminar
		DocumentReference docRefAsignacion = dbFirestore.collection("asignaciones").document(_id);
		ApiFuture<DocumentSnapshot> asignacionFuture = docRefAsignacion.get();
		DocumentSnapshot objAsignacion = asignacionFuture.get();
		
		
		Map<String, Object> updateArea = new HashMap<>();
		updateArea.put("estado", "Disponible");
		// Se actualiza la disponiblidad del area vinculada
		ApiFuture<WriteResult> writeResult=
		    dbFirestore
		        .collection("areas")
		        .document(objAsignacion.get("area").toString())
		        .set(updateArea, SetOptions.merge());
		// ...
		
		ApiFuture<WriteResult> writeResult2 = dbFirestore.collection("asignaciones").document(_id).delete();
		
		Map<String, Object> update = new HashMap<>();
		update.put("estado", null);
		// Se actualiza la asignacion del beacon con el nombre del area
		ApiFuture<WriteResult> writeResult3 =
		    dbFirestore
		        .collection("beacons")
		        .document(_id)
		        .set(update, SetOptions.merge());
		// ...
	}
	
	
	public static String Encriptar(String texto) {

        String secretKey = "qualityinfosolutions"; //llave para encriptar datos
        String base64EncryptedString = "";
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digestOfPassword = md.digest(secretKey.getBytes("utf-8"));
            byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
            SecretKey key = new SecretKeySpec(keyBytes, "DESede");
            Cipher cipher = Cipher.getInstance("DESede");
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] plainTextBytes = texto.getBytes("utf-8");
            byte[] buf = cipher.doFinal(plainTextBytes);
            byte[] base64Bytes = Base64.encodeBase64(buf);
            base64EncryptedString = new String(base64Bytes);

        } catch (Exception ex) {
        }
        return base64EncryptedString;
    }

    public static String Desencriptar(String textoEncriptado) throws Exception {

        String secretKey = "qualityinfosolutions"; //llave para encriptar datos
        String base64EncryptedString = "";

        try {
            byte[] message = com.google.api.client.util.Base64.decodeBase64(textoEncriptado.getBytes("utf-8"));
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digestOfPassword = md.digest(secretKey.getBytes("utf-8"));
            byte[] keyBytes = Arrays.copyOf(digestOfPassword, 24);
            SecretKey key = new SecretKeySpec(keyBytes, "DESede");

            Cipher decipher = Cipher.getInstance("DESede");
            decipher.init(Cipher.DECRYPT_MODE, key);

            byte[] plainText = decipher.doFinal(message);

            base64EncryptedString = new String(plainText, "UTF-8");

        } catch (Exception ex) {
        }
        return base64EncryptedString;
    }
}
	
