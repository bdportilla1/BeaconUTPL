package com.example.BeaconUtpl.controller;


import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.BeaconUtpl.Entities.Area;
import com.example.BeaconUtpl.Entities.Beacon;
import com.example.BeaconUtpl.Entities.Notificacion;
import com.example.BeaconUtpl.Entities.Usuario;
import com.example.BeaconUtpl.service.FirebaseService;


	@Controller
	public class ControllerRoutes {
		
		Usuario sesion = null;
		
		@Autowired
		FirebaseService firebaseService;
		
		@RequestMapping("/")
		public String home(Model model) {
			String vista="";
			if(sesion !=null){
				model.addAttribute("sesionActual", sesion);
				vista="inicio";
			}else {
				vista="login";
			}
			return vista;
		}
		
		@RequestMapping("/perfil")
		public String perfil(Model model) {
			String vista="";
			if(sesion !=null){
				model.addAttribute("sesionActual", sesion);
				vista="perfil";
			}else {
				vista="login";
			}
			return vista;
		}
		
		@RequestMapping("/gestion_usuarios")
		public String gestion_usuarios(Model model) {
			String vista="";
			if(sesion !=null){
				model.addAttribute("sesionActual", sesion);
				vista="gestion_usuarios";
			}else {
				vista="login";
			}
			return vista;
		}
		@RequestMapping("/gestion_areas")
		public String gestion_areas(Model model) {
			String vista="";
			if(sesion !=null){
				model.addAttribute("sesionActual", sesion);
				vista="gestion_areas";
			}else {
				vista="login";
			}
			return vista;
		}
		
		@RequestMapping("/gestion_beacons")
		public String gestion_beacons(Model model) {
			String vista="";
			if(sesion !=null){
				model.addAttribute("sesionActual", sesion);
				vista="gestion_beacons";
			}else {
				vista="login";
			}
			return vista;
		}
		
		@RequestMapping("/gestion_notificaciones")
		public String gestion_notificaciones(Model model) {
			String vista="";
			if(sesion !=null){
				model.addAttribute("sesionActual", sesion);
				vista="gestion_notificaciones";
			}else {
				vista="login";
			}
			return vista;
		}
		
		

		@RequestMapping("/salir")
		public String salir(Model model) {
			String vista="login";
			sesion=null;
			model.addAttribute("sesionActual", sesion);
			return vista;	
		}
		
		@RequestMapping("/inicio")
		public String ejemplo(Model model) {
			String vista="inicio";
			sesion=null;
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		
		
		@PostMapping("/ingresar")
		public String ingresar(@RequestParam(name="identificacion", required=false) String identificacion, 
				@RequestParam(name="pass", required=false) String pass,
	    		Model model) throws Exception {

			String vista="";
			sesion = firebaseService.validarLogin(identificacion, pass);
			if(sesion !=null){
				model.addAttribute("sesionActual", sesion);
				vista="inicio";
			}else {
				model.addAttribute("datos_incorrectos", true);
				vista="login";
			}
			return vista;
		 }
		
		
		
		@PostMapping("/registrarUsuario")
		public String registrarUsuario(@RequestParam(name="_id", required=false) String _id, 
				@RequestParam(name="identificacion", required=false) String cedula,
				@RequestParam(name="email", required=false) String email, 
				@RequestParam(name="nombres", required=false) String nombres, 
	    		@RequestParam(name="apellidos", required=false) String apellidos,
	    		@RequestParam(name="pass", required=false) String pass,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista="gestion_usuarios";
			Usuario usuario = new Usuario(cedula, nombres, apellidos, email, pass);
			firebaseService.guardarUsuario(_id, usuario);
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		@PostMapping("/actualizarPerfil")
		public String actualizarPerfil(@RequestParam(name="_id", required=false) String _id, 
				@RequestParam(name="identificacion", required=false) String cedula,
				@RequestParam(name="email", required=false) String email, 
				@RequestParam(name="nombre", required=false) String nombres, 
	    		@RequestParam(name="apellido", required=false) String apellidos,
	    		@RequestParam(name="pass", required=false) String pass,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista="perfil";
			Usuario usuario = new Usuario(_id, nombres, apellidos, email, pass);
			firebaseService.guardarUsuario(_id, usuario);
			sesion= usuario;
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		
		
		
		@PostMapping("/eliminarUsuario")
		public String eliminarUsuario(@RequestParam(name="_id", required=false) String _id,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista="gestion_usuarios";
			firebaseService.eliminarUsuario(_id);
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		@PostMapping("/eliminarPerfil")
		public String eliminarPerfil(@RequestParam(name="_id", required=false) String _id,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista="login";
			firebaseService.eliminarUsuario(_id);
			return vista;
		}
		
		
		@PostMapping("/registrarArea")
		public String registrarArea(@RequestParam(name="_id", required=false) String _id, 
				@RequestParam(name="nombre_area", required=false) String nombre,
				@RequestParam(name="descripcion_area", required=false) String descripcion,
				@RequestParam(name="piso", required=false) String piso, 
				@RequestParam(name="referencia", required=false) String referencia,
				@RequestParam(name="url", required=false) String url,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista= "gestion_areas";
			Area area = new Area(nombre, descripcion, referencia, piso, url);
			firebaseService.guardarArea(_id, area);
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		@PostMapping("/eliminarArea")
		public String eliminarArea(@RequestParam(name="_id", required=false) String _id,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista= "gestion_areas";
			firebaseService.eliminarArea(_id);
			model.addAttribute("sesionActual", sesion);
			return vista;
		}

		@PostMapping("/registrarBeacon")
		public String registrarBeacon(@RequestParam(name="_id", required=false) String _id, 
				@RequestParam(name="UID", required=false) String UID,
				@RequestParam(name="codigo_beacon", required=false) String codigo_beacon, 
				@RequestParam(name="estado", required=false) String estado, 
				@RequestParam(name="notificacion", required=false) String notificacion, 
				@RequestParam(name="protocolo", required=false) String protocolo, 
	    		Model model) throws InterruptedException, ExecutionException {
			String vista= "gestion_beacons";
			Beacon beacon = new Beacon(UID, codigo_beacon, estado, notificacion, protocolo);
			firebaseService.guardarBeacon(_id, beacon);
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		
		@PostMapping("/eliminarBeacon")
		public String eliminarBeacon(@RequestParam(name="_id", required=false) String _id,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista= "gestion_beacons";
			firebaseService.eliminarBeacon(_id);
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		
	
		@PostMapping("/registrarNotificacion")
		public String registrarNotificacion(@RequestParam(name="_id", required=false) String _id, 
				@RequestParam(name="tipo", required=false) String tipo, 
	    		@RequestParam(name="descripcion", required=false) String descripcion,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista= "gestion_notificaciones";
			Notificacion notificacion = new Notificacion(tipo, descripcion);
			firebaseService.guardarNotificacion(_id, notificacion);
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		
		@PostMapping("/registrarAsignacion")
		public String registrarAsignacion(@RequestParam(name="_idBeacon", required=false) String _idBeacon, 
				@RequestParam(name="_idArea", required=false) String _idArea,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista= "gestion_beacons";
			firebaseService.guardarAsignacion(_idBeacon, _idArea);
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		
		
		
		@PostMapping("/eliminarNotificacion")
		public String eliminarNotificacion(@RequestParam(name="_id", required=false) String _id,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista= "gestion_notificaciones";
			firebaseService.eliminarNotificacion(_id);
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		@PostMapping("/eliminarAsignacion")
		public String eliminarAsignacion(@RequestParam(name="_id", required=false) String _id,
	    		Model model) throws InterruptedException, ExecutionException {
			String vista= "gestion_beacons";
			firebaseService.eliminarAsignacion(_id);
			model.addAttribute("sesionActual", sesion);
			return vista;
		}
		
}
