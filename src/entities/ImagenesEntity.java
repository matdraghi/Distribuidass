package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name= "imageness")
public class ImagenesEntity {
	

	public ImagenesEntity(int numero, String path, String tipo, String nombre) {
		super();
		this.numero = numero;
		this.path = path;
		this.tipo = tipo;
		this.nombre = nombre;
	}


	public ImagenesEntity(int numero, String path, String tipo, int id, String nombre) {
		super();
		this.numero = numero;
		this.path = path;
		this.tipo = tipo;
		Id = id;
		this.nombre = nombre;
	}
	
	
	public ImagenesEntity() {}
	
	
	@Id
	@GeneratedValue
	@Column (name= "numero")
	private int numero;
	@Column (name= "path")
	private String path;
	@Column (name= "tipo")
	private String tipo;
	@Column (name = "IdReclamo")
	private int Id;
	@Column (name ="nombre")
	private String nombre;
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
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
}
