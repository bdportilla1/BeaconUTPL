package com.example.BeaconUtpl.Entities;

public class Beacon {
	
	
	String UID;
	String codigo;
	String estado;
	String notificacion;
	
	
	public Beacon() {
	}
	

	public Beacon(String UID, String codigo, String estado, String notificacion) {
		super();
		this.UID = UID;
		this.codigo = codigo;
		this.estado = estado;
		this.notificacion = notificacion;
	
	}
	public String getUID() {
		return UID;
	}
	public void setUID(String UID) {
		this.UID = UID;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getNotificacion() {
		return notificacion;
	}
	public void setNotificacion(String notificacion) {
		this.notificacion = notificacion;
	}




}
