package com.mycompany.myapp;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import controlador.Controlador;
import dto.ReclamosViewDTO;
import dto.exception.ExceptionDTO;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import modelo.Reclamo;
import views.ReclamoView;

@Controller
@RequestMapping(value = "/Reclamos")

public class ReclamosController {


	private static final Logger LOGGER = LoggerFactory.getLogger(ReclamosController.class);

	/** EN TEORIA ANDARIA DADO QUE DESDE EL TEST DE JAVA ACTUALIZADA LA BD*/
	@ResponseBody
	@RequestMapping(value = "/alta", method = RequestMethod.POST)
	public ResponseEntity<String> altaProducto(@RequestBody ReclamosViewDTO r) throws PersonaException, ReclamoException {
		LOGGER.info("Dando de alta Reclamo: {}", r.toString());
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
		String C = Controlador.getInstancia().altaReclamo(r.toView());
		response = new ResponseEntity<String>(mapper.toJson(C), HttpStatus.CREATED);
		}catch (ReclamoException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<String>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
		
	}
	
	/** Esta comprobado que anda*/
	@ResponseBody
	@RequestMapping(value = "/ConsultarReclamo", method = RequestMethod.GET)
	public ResponseEntity<String> ConsultarReclamo(@RequestParam(value = "Documento", required = true) String documento) throws ReclamoException {
		LOGGER.info("Consultando Reclamo con el NRO de Documento: {}", documento);
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
			String Consulta = Controlador.getInstancia().ConsultarReclamo(documento);
			response = new ResponseEntity<String>(mapper.toJson(Consulta), HttpStatus.CREATED);
		} catch (PersonaException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<String>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}
}
