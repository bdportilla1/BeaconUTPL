package com.example.BeaconUtpl.Entities;


public class Asignacion {

	/*
	private DocumentReference beacon;
	private DocumentReference area;*/
	
	String beacon;
	String area;
	
	Beacon objBeacon;
	Area objArea;
	public Asignacion() {
		
	}
	
	public String getBeacon() {
		return beacon;
	}
	public void setBeacon(String beacon) {
		this.beacon = beacon;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public Beacon getObjBeacon() {
		return objBeacon;
	}
	public void setObjBeacon(Beacon objBeacon) {
		this.objBeacon = objBeacon;
	}
	public Area getObjArea() {
		return objArea;
	}
	public void setObjArea(Area objArea) {
		this.objArea = objArea;
	}
	
	
	
	

	
	
}
