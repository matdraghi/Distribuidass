package entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import views.PersonaView;

@Entity
@Table(name="personas")
public class PersonaEntity {

	@Id
	private String documento;
	private String nombre;
	
	public PersonaEntity() { }
	
	public PersonaEntity(String documento, String nombre) {
		this.documento = documento;
		this.nombre = nombre;
	}

	public String getDocumento() {
		return documento;
	}

	public String getNombre() {
		return nombre;
	}

}
