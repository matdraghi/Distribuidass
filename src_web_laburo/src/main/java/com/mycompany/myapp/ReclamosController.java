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
import dto.UnidadView;
import dto.exception.ExceptionDTO;
import exceptions.DuenioException;
import exceptions.EdificioException;
import exceptions.InquilinoException;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import exceptions.UnidadException;
import modelo.Reclamo;
import views.ReclamoView;

@Controller
@RequestMapping(value = "/Reclamos")

public class ReclamosController {


	private static final Logger LOGGER = LoggerFactory.getLogger(ReclamosController.class);

	/** EN TEORIA ANDARIA DADO QUE DESDE EL TEST DE JAVA ACTUALIZA LA BD
	 * @throws InquilinoException 
	 * @throws DuenioException */
	@ResponseBody
	@RequestMapping(value = "/alta", method = RequestMethod.GET)
	public ResponseEntity<String> altaReclamo(@RequestParam(value = "documento", required = true) String documento,
			@RequestParam (value="codigo", required = true) int codigo, 
			@RequestParam (value="ubicacion", required = true) String ubicacion, 
			@RequestParam (value="descripcion", required = true) String descripcion, 
			@RequestParam (value="identificador", required = true) int identificador,
			@RequestParam (value="piso", required = true) int piso,
			@RequestParam (value="nombre", required = true) String nombre) throws PersonaException, ReclamoException, InquilinoException, DuenioException {
		LOGGER.info("Dando de alta Reclamo: {}", documento);
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
		Boolean C = Controlador.getInstancia().altaReclamo(documento, codigo, ubicacion, descripcion, identificador, piso, nombre);
		System.out.println (mapper.toJson(C));
		response = new ResponseEntity<String>(mapper.toJson(C), HttpStatus.CREATED);
		}catch (ReclamoException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<String>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
		
	}
	
	/** Probado y Anda*/
	@ResponseBody
	@RequestMapping(value = "/alta/SolicitarDetalles", method = RequestMethod.GET)
	public ResponseEntity<String> SolicitarDetalles(@RequestParam(value = "codigo", required = true) int codigo,
			@RequestParam (value="piso", required = true) int piso, 
			@RequestParam (value="identificador", required = true) int identificador, 
			@RequestParam (value="ubicacion", required = true) String ubicacion
			) throws ReclamoException, PersonaException {
		LOGGER.info("Agregando Detalles sobre reclamos: {}", codigo);
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		String Consulta = Controlador.getInstancia().SolicitarDetalles(codigo, piso, identificador, ubicacion);;
		response = new ResponseEntity<String>(mapper.toJson(Consulta), HttpStatus.CREATED);
				
		return response;
	}
	
	
	
	/** Esta comprobado que anda*/
	@ResponseBody
	@RequestMapping(value = "/Consultar", method = RequestMethod.GET)
	public ResponseEntity<String> ConsultarReclamo(@RequestParam(value = "documento", required = true) String documento) throws ReclamoException {
		LOGGER.info("Consultando Reclamo con el NRO de Documento: {}", documento);
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
			List<Reclamo> Consulta = Controlador.getInstancia().ConsultarReclamo(documento);
			for (Reclamo p2: Consulta) {

				System.out.println("IdReclamo: " + p2.getIdReclamo());
				System.out.println("Documento: " + p2.getDocumento());
				System.out.println("Codigo: " + p2.getCodigo());
				System.out.println("Ubicacion: " + p2.getUbicacion());
				System.out.println("Descripcion: " + p2.getDescripcion());
				System.out.println("Identificador: " + p2.getIdentificador());
			}
			System.out.println ("Json!" + mapper.toJson(Consulta));
			response = new ResponseEntity<String>(mapper.toJson(Consulta), HttpStatus.CREATED);
		} catch (PersonaException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<String>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
	}
	
	/** EN TEORIA ANDARIA DADO QUE DESDE EL TEST DE JAVA ACTUALIZA LA BD
	 * @throws InquilinoException 
	 * @throws DuenioException */
	@ResponseBody
	@RequestMapping(value = "/altaEdificio", method = RequestMethod.GET)
	public ResponseEntity<String> altaEdificio(@RequestParam(value = "documento", required = true) String documento,
			@RequestParam (value="codigo", required = true) int codigo, 
			@RequestParam (value="ubicacion", required = true) String ubicacion, 
			@RequestParam (value="descripcion", required = true) String descripcion,

			@RequestParam (value="piso", required = true) int piso,
			@RequestParam (value="nombre", required = true) String nombre) throws PersonaException, ReclamoException, InquilinoException, DuenioException {
		LOGGER.info("Dando de alta Reclamo: {}", documento);
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		try {
		Boolean C = Controlador.getInstancia().altaReclamoEdificio(documento, codigo, ubicacion, descripcion,piso,  nombre);
		System.out.println (mapper.toJson(C));
		response = new ResponseEntity<String>(mapper.toJson(C), HttpStatus.CREATED);
		}catch (ReclamoException ex) {
			LOGGER.error(ex.getMessage(), ex.getCause());
			ExceptionDTO exceptionDTO = new ExceptionDTO(ex.getMessage(), HttpStatus.NOT_FOUND);
			response = new ResponseEntity<String>(mapper.toJson(exceptionDTO), HttpStatus.NOT_FOUND);
		}
		return response;
		
	}
	
	@ResponseBody
	@RequestMapping(value = "/ObtenerIdentificadores", method = RequestMethod.GET)
	public ResponseEntity<String> altaEdificio(@RequestParam(value = "codigo", required = true) int codigo) throws PersonaException, ReclamoException, InquilinoException, DuenioException, EdificioException, UnidadException {
		LOGGER.info("Consultando Identificadores: {}", codigo);
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		List<views.UnidadView> C = Controlador.getInstancia().getUnidadesPorEdificio(codigo);
		System.out.println (mapper.toJson(C));
		response = new ResponseEntity<String>(mapper.toJson(C), HttpStatus.CREATED);
		return response;
		
	}
	
	@ResponseBody
	@RequestMapping(value = "/ObtenerIdentificadoress", method = RequestMethod.GET)
	public ResponseEntity<String> altaEdificio(@RequestParam(value = "nombre", required = true) String nombre) throws PersonaException, ReclamoException, InquilinoException, DuenioException, EdificioException, UnidadException {
		LOGGER.info("Consultando Con Nombre: {}", nombre);
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		System.out.println(Controlador.getInstancia().getUnidadesPorEdif(nombre));
		List<views.UnidadView> C = Controlador.getInstancia().getUnidadesPorEdif(nombre);
		for (views.UnidadView p2: C) {
			System.out.println("Codigo: " + p2.getEdificio().getCodigo());
			System.out.println("piso: " + p2.getPiso());
			System.out.println("Identificador: " + p2.getId());
			
			System.out.println("-------------------------------------------------");
		}
		
		System.out.println (mapper.toJson(C));
		response = new ResponseEntity<String>(mapper.toJson(C), HttpStatus.CREATED);
		return response;
		
	}
	
	@ResponseBody
	@RequestMapping(value = "/ObtenerIdReclamos", method = RequestMethod.GET)
	public ResponseEntity<String> ConsultaIdReclamos(@RequestParam(value = "documento", required = true) String documento) throws PersonaException, ReclamoException, InquilinoException, DuenioException, EdificioException, UnidadException {
		LOGGER.info("Consultando IdReclamos Para Documento: {}", documento);
		ResponseEntity<String> response = null;
		JsonMapper mapper = new JsonMapper();
		System.out.println(Controlador.getInstancia().ObtenerIdReclamos(documento));
		List<Reclamo> Consulta = Controlador.getInstancia().ObtenerIdReclamos(documento);
		for (Reclamo p2: Consulta) {
			System.out.println("IdReclamo: " + p2.getIdReclamo());
			
			System.out.println("-------------------------------------------------");
		}
		
		System.out.println (mapper.toJson(Consulta));
		response = new ResponseEntity<String>(mapper.toJson(Consulta), HttpStatus.CREATED);
		return response;
		
	}
}
