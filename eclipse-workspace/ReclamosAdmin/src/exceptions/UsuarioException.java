package exceptions;

public class UsuarioException extends Exception{
	
	private static final long serialVersionUID = 9018648448L;

	public UsuarioException(String mensaje) {
		super(mensaje);
	}
}
