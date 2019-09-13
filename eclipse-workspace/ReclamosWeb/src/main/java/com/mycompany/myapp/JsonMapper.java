package com.mycompany.myapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonMapper {

	private static final Logger LOGGER = LoggerFactory.getLogger(JsonMapper.class);
	
	private ObjectMapper objectMapper;
	
	public JsonMapper() {
		this.objectMapper = new ObjectMapper();
	}
	
	public String toJson(Object object) {
		String result = null;
		try {
			result = this.objectMapper.writeValueAsString(object);
		} catch (JsonProcessingException ex) {
			String message = "Error creando JSON";
			LOGGER.error(message);
			throw new RuntimeException(message, ex);
		}
		return result;
	}
}
