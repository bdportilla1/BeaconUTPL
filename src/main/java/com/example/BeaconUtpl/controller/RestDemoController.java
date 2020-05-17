package com.example.BeaconUtpl.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BeaconUtpl.Entities.Usuario;
import com.example.BeaconUtpl.service.FirebaseService;

@RestController

@RequestMapping("/api")
public class RestDemoController {
	
	@Autowired
	private FirebaseService firebaseServise;
	
	@GetMapping
	public List <Usuario> listar() throws InterruptedException, ExecutionException{
		return firebaseServise.getUsuarios();
	}

}
