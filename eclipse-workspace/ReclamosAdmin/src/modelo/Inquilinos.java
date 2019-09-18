package modelo;

public class Inquilinos {
	public Inquilinos(int id, int identificador, String documento) {
		super();
		this.id = id;
		this.identificador = identificador;
		this.documento = documento;
	}
	private int id;
	private int identificador;
	private String documento;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
