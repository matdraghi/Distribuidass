package dto;

import org.springframework.http.HttpStatus;

public class HttpStatusDTO {

	private String name;
	private int code;
	
	public HttpStatusDTO(HttpStatus httpStatus) {
		super();
		this.name = httpStatus.name();
		this.code = httpStatus.value();
	}
	
	public HttpStatusDTO() {
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
}
