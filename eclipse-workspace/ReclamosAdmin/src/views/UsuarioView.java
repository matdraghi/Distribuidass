package views;

public class UsuarioView {

	public UsuarioView(String documento, String password) {
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
	
}
