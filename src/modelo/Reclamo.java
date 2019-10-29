package modelo;

import daos.ReclamosDAO;
import views.Estado;
import views.ReclamoView;

public class Reclamo {
	
	public Reclamo() {
		super();
	}
	private int p;

	public Reclamo (String documento, int codigo, String ubicacion, String descripcion,
			int identificador, Estado est, int piso, String nombre) {
		super();
		this.Documento = documento;
		this.codigo = codigo;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.identificador = identificador;
		this.est = est;
		this.p = piso;
		this.nombre = nombre;
	}
	
	public Reclamo (String documento, int codigo, String ubicacion, String descripcion,
			 Estado est, int piso, String nombre) {
		super();
		this.Documento = documento;
		this.codigo = codigo;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.est = est;
		this.p = piso;
		this.nombre = nombre;

	}

	public Reclamo(int idReclamo, String documento, int codigo, String ubicacion, String descripcion,
			int identificador, String Estado, int piso, String nombre) {
		super();
		IdReclamo = idReclamo;
		Documento = documento;
		this.codigo = codigo;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.identificador = identificador;
		this.estado = Estado;

		this.p = piso;
		this.nombre = nombre;
	}
	private int IdReclamo;
	private String idRe;
	private String Documento;
	private int codigo;
	private String ubicacion;
	private String descripcion;
	private int identificador;
	private Estado est;
	private String estado;
	private String nombre;
	
	public void setidRe(String idRe) {
		this.idRe = idRe;
	}
	public String getIdRe () {
		return idRe;
	}
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

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getP() {
		return p;
	}

	public void setP(int p) {
		this.p = p;
	}

	
}

