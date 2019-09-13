package entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="edificios")
public class EdificioEntity {
	
	@Id
	private Integer codigo;
	private String nombre;
	private String direccion;
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name="codigoEdificio")
	private List<UnidadEntity> unidades;
	
	public EdificioEntity() { }
	
	public EdificioEntity(int codigo, String nombre, String direccion) {
		this.codigo = codigo;
		this.nombre = nombre;
		this.direccion = direccion;
	}
	
	public Integer getCodigo() {
		return codigo;
	}
	
	public String getNombre() {
		return nombre;
	}

	public String getDireccion() {
		return direccion;
	}
}
