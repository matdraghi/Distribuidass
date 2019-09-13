package entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="inquilinos")
public class InquilinoEntity {

	@Id
	private Integer id;
	@ManyToOne
	@JoinColumn(name="identificador")
	private UnidadEntity unidad;
	@ManyToOne
	@JoinColumn(name="documento")	
	private PersonaEntity persona;
	
	public InquilinoEntity() {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public UnidadEntity getUnidad() {
		return unidad;
	}

	public void setUnidad(UnidadEntity unidad) {
		this.unidad = unidad;
	}

	public PersonaEntity getPersona() {
		return persona;
	}

	public void setPersona(PersonaEntity persona) {
		this.persona = persona;
	}
	
}
