package com.example.BeaconUtpl.Entities;

public class Beacon {
	
	
	String UID;
	String codigo;
	String estado;
	String notificacion;
	String protocolo;
	
	public Beacon() {
	}
	

	public Beacon(String uID, String codigo, String estado, String notificacion, String protocolo) {
		super();
		UID = uID;
		this.codigo = codigo;
		this.estado = estado;
		this.notificacion = notificacion;
		this.protocolo = protocolo;
	}
	public String getUID() {
		return UID;
	}
	public void setUID(String uID) {
		UID = uID;
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
	public String getProtocolo() {
		return protocolo;
	}
	public void setProtocolo(String protocolo) {
		this.protocolo = protocolo;
	}
	
	
	
	
	
	
	


}
