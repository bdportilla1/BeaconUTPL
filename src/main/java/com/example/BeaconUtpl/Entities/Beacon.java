package com.example.BeaconUtpl.Entities;

public class Beacon {
	
	String codigo;
	String UID;
	String protocolo;
	String estado;
	
	
	
	
	public Beacon(String codigo, String uID, String protocolo, String estado) {
		
		this.codigo = codigo;
		UID = uID;
		this.protocolo = protocolo;
		this.estado = estado;
	}
	
	public Beacon() {
		
	}
	
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getUID() {
		return UID;
	}
	public void setUID(String uID) {
		UID = uID;
	}
	public String getProtocolo() {
		return protocolo;
	}
	public void setProtocolo(String protocolo) {
		this.protocolo = protocolo;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	
	

}
