package views;

public class DetalleView {
	
	public DetalleView(int codigo, int piso, int identificador, String ubicacion) {
		super();
		this.codigo = codigo;
		this.piso = piso;
		this.identificador = identificador;
		this.ubicacion = ubicacion;
	}
	
	private int codigo;
	private int piso;
	private int identificador;
	private String ubicacion;
	
	public int getCodigo() {
		return codigo;
	}
	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}
	public int getPiso() {
		return piso;
	}
	public void setPiso(int piso) {
		this.piso = piso;
	}
	public int getIdentificador() {
		return identificador;
	}
	public void setIdentificador(int identificador) {
		this.identificador = identificador;
	}
	public String getUbicacion() {
		return ubicacion;
	}
	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}
	
}
