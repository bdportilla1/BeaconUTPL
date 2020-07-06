package com.example.BeaconUtpl.Models;

public class Area {
	
	
	String codigo;
	String nombre;
	String descripcion;
	String estado;
	String piso;
	String url;
	
	
	public Area() {
		
	}


	public Area(String nombre, String descripcion, String estado, String piso, String url) {
		super();
		
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.estado = estado;
		this.piso = piso;
		this.url = url;
	}

	public String getCodigo() {
		return codigo;
	}


	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public String getDescripcion() {
		return descripcion;
	}


	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}


	public String getEstado() {
		return estado;
	}


	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getPiso() {
		return piso;
	}


	public void setPiso(String piso) {
		this.piso = piso;
	}


	public String getUrl() {
		return url;
	}


	public void setUrl(String url) {
		this.url = url;
	}
	
	
	
}
