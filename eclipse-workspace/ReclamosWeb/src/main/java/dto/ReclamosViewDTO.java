package dto;

import java.util.Date;

import views.ReclamoView;

public class ReclamosViewDTO {

	private int IdReclamo;
	private String Documento;
	private int codigo;
	private String ubicacion;
	private String descripcion;
	private int identificador;

	public ReclamosViewDTO() {
	}

	
	public ReclamoView toView() {
		return new ReclamoView(Documento, codigo, ubicacion, descripcion, identificador);
	}

	public String toString(){
		return IdReclamo + " " + Documento + " " + codigo + " " + " " + descripcion + " " + identificador;
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
}
