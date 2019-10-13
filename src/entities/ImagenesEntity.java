package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name= "imageness")
public class ImagenesEntity {
	
	public ImagenesEntity(int numero, String path, String tipo) {
		super();
		this.numero = numero;
		this.path = path;
		this.tipo = tipo;
	}
	
	@Id
	@GeneratedValue
	@Column (name= "numero")
	private int numero;
	@Column (name= "path")
	private String path;
	@Column (name= "tipo")
	private String tipo;

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
	
}
