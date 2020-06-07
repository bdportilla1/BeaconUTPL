package com.example.BeaconUtpl.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.BeaconUtpl.Entities.Area;
import com.example.BeaconUtpl.Entities.Asignacion;
import com.example.BeaconUtpl.Entities.Beacon;
import com.example.BeaconUtpl.Entities.Notificacion;
import com.example.BeaconUtpl.Entities.Usuario;
import com.example.BeaconUtpl.service.FirebaseService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class RestDemoController {
	
	@Autowired
	private FirebaseService firebaseServise;
	
	@GetMapping("/usuarios")
	public List <Usuario> listarUsuarios() throws InterruptedException, ExecutionException{
		System.out.println("Devuelto usuarios");
		return firebaseServise.getUsuarios();
	}
	@GetMapping("/areas")
	public List <Area> listarAreas() throws InterruptedException, ExecutionException{
		System.out.println("Devuelto areas");
		
		List<Area> ls= firebaseServise.getAreas();
		System.out.println(ls.toString());
		return ls;
	}
	@GetMapping("/beacons")
	public List <Beacon> listarBeacons() throws InterruptedException, ExecutionException{
		System.out.println("Devuelto beacons");
		return firebaseServise.getBeacons();
	}
	@GetMapping("/notificaciones")
	public List <Notificacion> listarNotificaciones() throws InterruptedException, ExecutionException{
		System.out.println("Devuelto notificaciones");
		return firebaseServise.getNotificaciones();
	}
	
	@GetMapping("/asignaciones")
	public List <Asignacion> listarAsignaciones() throws InterruptedException, ExecutionException{
		System.out.println("Devuelto asignaciones");
		return firebaseServise.getAsignaciones();
	}
	

}
