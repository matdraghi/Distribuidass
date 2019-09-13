package entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="reclamos")
public class ReclamoEntity {

	public ReclamoEntity(int idReclamo, String documento, int codigo, String ubicacion, String descripcion,
			int identificador) {
		this.IdReclamo = idReclamo;
		this.Documento = documento;
		this.codigo = codigo;
		this.ubicacion = ubicacion;
		this.descripcion = descripcion;
		this.identificador = identificador;
	}

	@Id
	private int IdReclamo;
	private String Documento;
	private int codigo;
	private String ubicacion;
	private String descripcion;
	private int identificador;
	
	public ReclamoEntity() { }

	public int getIdReclamo() {
		return IdReclamo;
	}

	public String getDocumento() {
		return Documento;
	}

	public int getCodigo() {
		return codigo;
	}

	public String getUbicacion() {
		return ubicacion;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public int getIdentificador() {
		return identificador;
	}
	
	
	
}
