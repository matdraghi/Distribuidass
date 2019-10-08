package exceptions;

public class LoginException extends Exception{
	private static final long serialVersionUID = 9018648448L;

	public LoginException(String mensaje) {
		super(mensaje);
	}
}
