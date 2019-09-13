package com.mycompany.myapp;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import controlador.Controlador;
import dto.ExceptionDTO;
import dto.ReclamosViewDTO;
import exceptions.PersonaException;
import modelo.Reclamo;
import views.ReclamoView;

@Controller
@RequestMapping(value = "/Reclamos")

public class ReclamosController {


	private static final Logger LOGGER = LoggerFactory.getLogger(ReclamosController.class);

	@ResponseBody
	@RequestMapping(value = "/crear", method = RequestMethod.POST)
	public ResponseEntity<String> crearPedido(@RequestBody ReclamosViewDTO pedido) throws PersonaException {
		LOGGER.info("Creando nuevo Reclamo: {}");
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
			int numeroNuevoReclamo = Controlador.getInstancia().altaReclamo(reclamo);
			response = new ResponseEntity<String>(mapper.toJson(numeroNuevoReclamo), HttpStatus.CREATED);
		} catch (PersonaException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<String>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}
}
