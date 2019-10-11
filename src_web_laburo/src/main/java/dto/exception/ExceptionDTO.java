package dto.exception;

import org.springframework.http.HttpStatus;

public class ExceptionDTO {
	private String message;
	private HttpStatusDTO status;	
	
	public ExceptionDTO(String message, HttpStatus status) {
		super();
		this.message = message;
		this.status = new HttpStatusDTO(status);
	}
	
	public ExceptionDTO() {
		
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setErrorMessage(String aMessage) {
		this.message = aMessage;
	}

	public HttpStatusDTO getStatus() {
		return status;
	}

	public void setStatus(HttpStatusDTO status) {
		this.status = status;
	}
}
