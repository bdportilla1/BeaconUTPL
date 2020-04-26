/*package com.example.BeaconUtpl.controller;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.BeaconUtpl.Entities.Usuario;
import com.example.BeaconUtpl.service.FirebaseService;
import com.google.firebase.auth.FirebaseAuth;

@RestController
public class RestControllerBeacon {
	
	@Autowired
	FirebaseService firebaseService;
	
	@PostMapping("/crearUsuario")
	public void postCrearUsuario(@RequestBody Usuario usuario) throws InterruptedException, ExecutionException {
		
		firebaseService.guardarUsuario(usuario);
		
	
		
	}

}*/
