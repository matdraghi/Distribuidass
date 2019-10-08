package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="DetalleReclamos")
public class DetalleEntity {
	
	public DetalleEntity(int id,int codigo, int piso, int identificador, String ubicacion) {
		super();
		this.id = id;
		this.codigo = codigo;
		this.piso = piso;
		this.identificador = identificador;
		this.ubicacion = ubicacion;
	}
	@Id
	@GeneratedValue
	@Column (name = "id")
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
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
}
