package modelo;

import daos.DetalleDAO;
import daos.ReclamosDAO;

public class DetalleReclamos {
	
	public DetalleReclamos(int id, int codigo, int piso, int identificador, String ubicacion) {
		super();
		this.id = id;
		this.codigo = codigo;
		this.piso = piso;
		this.identificador = identificador;
		this.ubicacion = ubicacion;
	}
	
	public DetalleReclamos(int codigo2, int piso2, int identificador2, String ubicacion2) {
		// TODO Auto-generated constructor stub
		this.codigo = codigo2;
		this.piso = piso2;
		this.identificador = identificador2;
		this.ubicacion = ubicacion2;
	}

	private int id;
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
	
	public void save() {
		// TODO Auto-generated method stub
		DetalleDAO.getInstancia().save(this);
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	
}
