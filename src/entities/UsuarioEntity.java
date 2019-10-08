package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="usuarios")
public class UsuarioEntity {

	
	public UsuarioEntity() {
	}

	public UsuarioEntity(String documento, String password) {
		super();
		this.documento = documento;
		this.password = password;
	}

	@Id
	@Column (name = "documento")
	
	private String documento;
	
	@Column (name = "password")
	
	private String password;

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
