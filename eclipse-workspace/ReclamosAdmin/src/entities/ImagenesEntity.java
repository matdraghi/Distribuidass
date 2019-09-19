package entities;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table (name= "imagenes")
public class ImagenesEntity {
	
	public ImagenesEntity(int numero, String path, String tipo, int idReclamo) {
		super();
		this.numero = numero;
		this.path = path;
		this.tipo = tipo;
		IdReclamo = idReclamo;
	}
	private int numero;
	private String path;
	private String tipo;
	private int IdReclamo;
	public int getNumero() {
		return numero;
	}
	public void setNumero(int numero) {
		this.numero = numero;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public int getIdReclamo() {
		return IdReclamo;
	}
	public void setIdReclamo(int idReclamo) {
		IdReclamo = idReclamo;
	}
	
}
