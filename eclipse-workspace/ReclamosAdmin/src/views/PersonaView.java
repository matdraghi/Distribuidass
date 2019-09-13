package views;

public class PersonaView {
	
	private String documento;
	private String nombre;
	
	public PersonaView() {}

	public PersonaView(String documento, String nombre) {
		this.documento = documento;
		this.nombre = nombre;
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

	public String toString() {
		return documento + " " + nombre;
	}
	
}
