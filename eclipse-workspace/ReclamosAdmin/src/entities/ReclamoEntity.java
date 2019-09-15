package entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table (name="dbo.reclamos")
public class ReclamoEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="IdReclamo")
	public int getIdReclamo() {
		return IdReclamo;
	}
	
	
	@ManyToOne
	@JoinColumn(name="documento")
	public String getDocumento() {
		return Documento;
	}
	
	private String Documento;
	private int IdReclamo;
	private int codigo;
	private String ubicacion;
	private String descripcion;
	private int identificador;
	
	public ReclamoEntity() {
		
	}
	
	public ReclamoEntity(int idReclamo, String documento, int codigo, String ubicacion, String descripcion, int identificador) {
		this.IdReclamo = idReclamo;
		this.Documento = documento;
		this.codigo = codigo;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.identificador = identificador;
	}
	


	@Column (name = "codigo ", nullable = false)
	public int getCodigo() {
		return codigo;
	}


	@Column (name = "ubicacion ", nullable = false)
	public String getUbicacion() {
		return ubicacion;
	}


	@Column (name = "descripcion", nullable = false)
	public String getDescripcion() {
		return descripcion;
	}

	@Column (name = "identificador ", nullable = false)
	public int getIdentificador() {
		return identificador;
	}
	
	
	
}
