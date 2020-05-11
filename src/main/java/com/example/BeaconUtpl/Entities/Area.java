package com.example.BeaconUtpl.Entities;

public class Area {
	
	String descripcion;
	String piso;
	String referencia;
	
	public Area() {
		
	}
	
	public Area(String descripcion, String piso, String referencia) {
		super();
		this.descripcion = descripcion;
		this.piso = piso;
		this.referencia = referencia;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getPiso() {
		return piso;
	}
	public void setPiso(String piso) {
		this.piso = piso;
	}
	public String getReferencia() {
		return referencia;
	}
	public void setReferencia(String referencia) {
		this.referencia = referencia;
	}
	
	

}
