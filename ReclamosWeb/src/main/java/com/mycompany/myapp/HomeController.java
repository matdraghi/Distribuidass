package com.mycompany.myapp;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.swing.Spring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import exceptions.DocumentException;
import exceptions.EdificioException;
import exceptions.NombreException;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import exceptions.UnidadException;
import controlador.Controlador;
import dto.ReclamosViewDTO;
/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		try {
			int b = Controlador.getInstancia().getEdificios().size();
			logger.info("La cantidad de edificios es de :", b);
		} catch (EdificioException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnidadException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	

	@ResponseBody
	@RequestMapping(value = "/ValidarRegistroPersona", method = RequestMethod.GET)
	public ResponseEntity<String> ValidarRegistro(@RequestParam(value = "Documento", required = true) String Documento,
			@RequestParam(value = "Nombre", required = true) String Nombre)
			throws DocumentException, NombreException, PersonaException {
		boolean result = Controlador.getInstancia().ValidarRegistroPersona(Documento, Nombre);
		JsonMapper mapper = new JsonMapper();
		return new ResponseEntity<String>(mapper.toJson(result), HttpStatus.OK);
	}
	
	
}
