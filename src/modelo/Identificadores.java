package modelo;

public class Identificadores {

	
	public Identificadores(String identificador, String piso) {
		super();
		this.identificador = identificador;
		this.piso = piso;
	}
	private String identificador;
	private String piso;
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
	
	
}
