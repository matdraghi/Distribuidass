package dto;

import views.PersonaView;


public class PersonaViewDTO {
	private String documento;
	private String nombre;
	
	public PersonaViewDTO() {
		
	
	}

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public PersonaView toView() {
		return new PersonaView(documento, nombre);
	}
}
