package modelo;

import daos.UsuarioDAO;

public class Usuario {
	
	public Usuario(String documento, String password) {
		super();
		this.documento = documento;
		Password = password;
	}
	private String documento;
	private String Password;
	public String getDocumento() {
		return documento;
	}
	public void setDocumento(String documento) {
		this.documento = documento;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public void save() {
		// TODO Auto-generated method stub
		UsuarioDAO.getInstancia().save(this);
	}
	

}
