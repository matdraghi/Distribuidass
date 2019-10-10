package modelo;

import daos.ReclamosDAO;
import views.Estado;
import views.ReclamoView;

public class Reclamo {
	
	public Reclamo (String documento, int codigo, String ubicacion, String descripcion,
			int identificador, Estado est) {
		super();
		this.Documento = documento;
		this.codigo = codigo;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.identificador = identificador;
		this.est = est;
	}
	
	public Reclamo (String documento, int codigo, String ubicacion, String descripcion,
			 Estado est) {
		super();
		this.Documento = documento;
		this.codigo = codigo;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.est = est;
	}

	public Reclamo(int idReclamo, String documento, int codigo, String ubicacion, String descripcion,
			int identificador) {
		super();
		IdReclamo = idReclamo;
		Documento = documento;
		this.codigo = codigo;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.identificador = identificador;
	}
	private int IdReclamo;
	private String Documento;
	private int codigo;
	private String ubicacion;
	private String descripcion;
	private int identificador;
	private Estado est;
	
	public int getIdReclamo() {
		return IdReclamo;
	}
	public void setIdReclamo(int idReclamo) {
		IdReclamo = idReclamo;
	}
	public String getDocumento() {
		return Documento;
	}
	public void setDocumento(String documento) {
		Documento = documento;
	}
	public int getCodigo() {
		return codigo;
	}
	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}
	public String getUbicacion() {
		return ubicacion;
	}
	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public int getIdentificador() {
		return identificador;
	}
	public void setIdentificador(int identificador) {
		this.identificador = identificador;
	}
	public void save() {
		// TODO Auto-generated method stub
		ReclamosDAO.getInstancia().save(this);
	}
	
	public String toString(){
		return IdReclamo + " " + Documento + " " + ubicacion + " " + descripcion + " " + codigo + " " + identificador;
	}
	
	public ReclamoView toView(){
		return new ReclamoView(Documento, codigo, descripcion, ubicacion, identificador);
	}

	public Estado getEst() {
		return est;
	}

	public void setEst(Estado est) {
		this.est = est;
	}

	
}

