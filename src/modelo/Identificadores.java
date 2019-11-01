package modelo;

public class Identificadores {

	
	public Identificadores(String identificador, String piso) {
		super();
		this.identificador = identificador;
		this.piso = piso;
	}
	private String identificador;
	private String piso;
	private String nombre;
	private String ubicacion;
	private String documento;
	public String getIdentificador() {
		return identificador;
	}
	public String setIdentificador(String identificador) {
		this.identificador = identificador;
		return this.identificador;
	}
	public String getPiso() {
		return piso;
	}
	public String setPiso(String piso) {
		this.piso = piso;
		return this.piso;
	}
	public Identificadores() {
		super();
	}
	public String getNombre() {
		return nombre;
	}
	public String setNombre(String nombre) {
		this.nombre = nombre;
		return this.nombre;
	}
	public String getUbicacion() {
		return ubicacion;
	}
	public String setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
		return this.ubicacion;
	}
	public String getDocumento() {
		return documento;
	}
	public void setDocumento(String documento) {
		this.documento = documento;
	}
	
	
}
