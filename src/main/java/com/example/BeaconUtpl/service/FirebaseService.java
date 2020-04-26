/*package com.example.BeaconUtpl.service;

import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.example.BeaconUtpl.Entities.Usuario;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class FirebaseService {

	public void guardarUsuario(Usuario usuario) throws InterruptedException, ExecutionException {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("usuarios").document(usuario.getEmail()).set(usuario);
		
		
	}
}*/
