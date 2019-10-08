package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name= "imageness")
public class ImagenesEntity {
	
	public ImagenesEntity(int id, String path, String tipo) {
		super();
		this.id = id;
		this.path = path;
		this.tipo = tipo;
	}
	
	@Id
	@GeneratedValue
	@Column (name= "id")
	private int id;
	@Column (name= "path")
	private String path;
	@Column (name= "tipo")
	private String tipo;
	public int getNumero() {
		return id;
	}
	public void setNumero(int id) {
		this.id = id;
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
