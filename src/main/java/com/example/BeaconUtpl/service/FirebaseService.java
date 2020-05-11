package com.example.BeaconUtpl.service;

import java.security.MessageDigest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

import com.example.BeaconUtpl.Entities.Area;
import com.example.BeaconUtpl.Entities.Beacon;
import com.example.BeaconUtpl.Entities.Notificacion;
import com.example.BeaconUtpl.Entities.Usuario;
import com.google.api.client.repackaged.org.apache.commons.codec.binary.Base64;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

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
	public void guardarArea(String _id, Area area) throws InterruptedException, ExecutionException {
		//Seteando el objeto Area
		Firestore dbFirestore = FirestoreClient.getFirestore();
		Map<String, Object> docData = new HashMap<>();
		docData.put("descripcion", area.getDescripcion());
		docData.put("piso", area.getPiso() );
		docData.put("referencia", area.getReferencia());
	
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
		docData.put("UID", beacon.getUID());
		docData.put("codigo", beacon.getCodigo());
		docData.put("estado", beacon.getEstado());
		docData.put("notificacion", beacon.getNotificacion());
		docData.put("protocolo", beacon.getProtocolo());
	
		if(_id.equals("null")) {
			//guardar documento nuevo
			ApiFuture<WriteResult> future = dbFirestore.collection("beacons").document().set(docData);
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
	public void eliminarArea(String _id) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ApiFuture<WriteResult> writeResult = dbFirestore.collection("areas").document(_id).delete();
	}
	public void eliminarBeacon(String _id) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ApiFuture<WriteResult> writeResult = dbFirestore.collection("beacons").document(_id).delete();
	}
	public void eliminarNotificacion(String _id) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ApiFuture<WriteResult> writeResult = dbFirestore.collection("notificaciones").document(_id).delete();
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
            byte[] message = Base64.decodeBase64(textoEncriptado.getBytes("utf-8"));
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
	
