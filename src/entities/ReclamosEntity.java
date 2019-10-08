package entities;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Table (name = "reclamoss")
public class ReclamosEntity  {
	

	@Id
	@GeneratedValue
	@Column(name="IdReclamo")
	private int IdReclamo;
	public int getIdReclamo() {
		return IdReclamo;
	}
	
	
	private String documento;
	public String getDocumento() {
		return documento;
	}
	
	
	private int codigo;
	private String ubicacion;
	private String descripcion;
	private int identificador;
	private String estado;
	public ReclamosEntity() {
		
	}
	
	public ReclamosEntity(int idReclamo, String documento, int codigo, String ubicacion, String descripcion, int identificador,
			String estado) {
		this.IdReclamo = idReclamo;
		this.documento = documento;
		this.codigo = codigo;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.identificador = identificador;
		this.estado= estado;
	}
	


	@Column (name = "codigo ")
	public int getCodigo() {
		return codigo;
	}


	@Column (name = "ubicacion ")
	public String getUbicacion() {
		return ubicacion;
	}


	@Column (name = "descripcion")
	public String getDescripcion() {
		return descripcion;
	}

	@Column (name = "identificador ")
	public int getIdentificador() {
		return identificador;
	}
	
	@Column (name ="Estado")
	

	public void setIdReclamo(int idReclamo) {
		IdReclamo = idReclamo;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public void setIdentificador(int identificador) {
		this.identificador = identificador;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	
	
}
