package modelo;

public class Duenio {
	public Duenio(int id, int identificador, String documento) {
		super();
		Id = id;
		this.identificador = identificador;
		this.documento = documento;
	}
	private int Id;
	private int identificador;
	private String documento;
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public int getIdentificador() {
		return identificador;
	}
	public void setIdentificador(int identificador) {
		this.identificador = identificador;
	}
	public String getDocumento() {
		return documento;
	}
	public void setDocumento(String documento) {
		this.documento = documento;
	}
}
