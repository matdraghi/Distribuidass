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

	@ResponseBody
	@RequestMapping(value = "/AltaReclamo", method = RequestMethod.GET)
	public ResponseEntity<String> CrearReclamo(@RequestBody ReclamosViewDTO R, 
			@RequestParam(value = "IdReclamo", required = true) int IdReclamo,
			@RequestParam(value = "Documento", required = true) String documento,
			@RequestParam(value = "Codigo", required = true) int codigo,
			@RequestParam(value = "Ubicacion", required = true) String ubicacion,
			@RequestParam(value = "Descripcion", required = true) String descripcion, 
			@RequestParam(value = "Identificador", required = true) String identificador)
			throws PersonaException, ReclamoException {
		LOGGER.info("Creando nuevo Reclamo: {}", R.toView());
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		int NuevoReclamo = 0;
		try {
			NuevoReclamo = Controlador.getInstancia().altaReclamo(R.toView());
		} catch (ReclamoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response = new ResponseEntity<String>(mapper.toJson(NuevoReclamo), HttpStatus.CREATED);
		return response;
	}
	
	@ResponseBody
	@RequestMapping(value = "/AltaReclamo2", method = RequestMethod.GET)
	public ResponseEntity<String> CrearReclamoo(@RequestBody ReclamosViewDTO R, 
			//@RequestParam(value = "IdReclamo", required = false, identity_insert = on) int IdReclamo,
			@RequestParam(value = "Documento", required = true) String documento,
			@RequestParam(value = "Codigo", required = true) int codigo,
			@RequestParam(value = "Ubicacion", required = true) String ubicacion,
			@RequestParam(value = "Descripcion", required = true) String descripcion, 
			@RequestParam(value = "Identificador", required = true) String identificador)
			throws PersonaException, ReclamoException {
		LOGGER.info("Creando nuevo Reclamo: {}", R.toView());
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		int NuevoReclamo = 0;
		NuevoReclamo = Controlador.getInstancia().crearReclamo(R.toView());
		response = new ResponseEntity<String>(mapper.toJson(NuevoReclamo), HttpStatus.CREATED);
		return response;
	}
	
	
	
	// Anda
	@ResponseBody
	@RequestMapping(value = "/ConsultarReclamo", method = RequestMethod.GET)
	public ResponseEntity<String> crearPedidoCuit(@RequestParam(value = "Documento", required = true) String documento) throws ReclamoException {
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
