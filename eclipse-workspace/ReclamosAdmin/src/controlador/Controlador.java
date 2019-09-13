package controlador;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import daos.DuenioDAO;
import daos.EdificioDAO;
import daos.PersonaDAO;
import daos.ReclamosDAO;
import daos.UnidadDAO;
import exceptions.DocumentException;
import exceptions.EdificioException;
import exceptions.NombreException;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import exceptions.UnidadException;
import modelo.Edificio;
import modelo.Persona;
import modelo.Reclamo;
import modelo.Unidad;
import views.EdificioView;
import views.PersonaView;
import views.ReclamoView;
import views.UnidadView;

public class Controlador {

	private static Controlador instancia;
	
	private Controlador() { }
	
	public static Controlador getInstancia() {
		if(instancia == null)
			instancia = new Controlador();
		return instancia;
	}
	
	// agregado por grupo Ya Anda
	public boolean ValidarRegistroPersona(String Documento, String Nombre) throws DocumentException, NombreException, PersonaException {
		Persona persona = PersonaDAO.getInstancia().findByID(Documento);
		//boolean B = persona.getNombre().equals(Nombre);
		String c = persona.getNombre();
		if(persona.getDocumento().equals(Documento)){
			//System.out.println(B);
			System.out.println (persona.getNombre());

			System.out.println (Nombre);
			
			
			String s = "";
			for (int x=0; x < persona.getNombre().length(); x++) { //que recorrer el arreglo para verificar que ambas cadenas tuvieran el mismo largo
				if (persona.getNombre().charAt(x) != ' ')
				    s += persona.getNombre().charAt(x);
				}
			int H = s.length() + 1;
			System.out.println(H); // Debido a que recibimos un varchar de la BD poseia mas espacio, tuvimos
			int I = Nombre.length();
			System.out.println(I);
			if (H == I) {
				System.out.println("Los Datos ingresados son Validos");
				return true;
			}
			throw new NombreException("El nombre ingresado no es valido, vuelva a ingresar");
		}
		else{
			throw new DocumentException("El documento ingresado no es correcto por favor ingrese TIPO + NRO de documento");
		}
	}
	
	// Agregado por grupo
	public void altaReclamo(ReclamoView recibido) throws ReclamoException{			
		int IdReclamo = (int) (Math.random() * 1000345) + 2; // aca la idea es generar un random cada vez
		// que se desee realizar un nuevo reclamo!
		
		Reclamo r = new Reclamo (IdReclamo, 
				recibido.getDocumento(),
				recibido.getCodigo(),
				recibido.getDescripcion(),
				recibido.getUbicacion(),
				recibido.getIdentificador());
		r.save();
	}
	
	
	
	/** OK */
	public List<EdificioView> getEdificios() throws EdificioException, UnidadException{
		List<EdificioView> resultado = new ArrayList<EdificioView>();
		List<Edificio> edificios = EdificioDAO.getInstancia().getAll();
		for(Edificio edificio : edificios)
			resultado.add(edificio.toView());
		return resultado;
	}
	/** OK */
	public List<UnidadView> getUnidadesPorEdificio(int codigo) throws EdificioException, UnidadException{
		List<UnidadView> resultado = new ArrayList<UnidadView>();
		Edificio edificio = buscarEdificio(codigo);
		List<Unidad> unidades = edificio.getUnidades();
		for(Unidad unidad : unidades)
			resultado.add(unidad.toView());
		return resultado;
	}
	
	/** OK */
	public List<PersonaView> habilitadosPorEdificio(int codigo) throws EdificioException, UnidadException, PersonaException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Edificio edificio = buscarEdificio(codigo);
		Set<Persona> habilitados = edificio.habilitados();
		for(Persona persona : habilitados)
			resultado.add(persona.toView());
		return resultado;
	}

	/** OK */
	public List<PersonaView> dueniosPorEdificio(int codigo) throws EdificioException, UnidadException, PersonaException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Edificio edificio = buscarEdificio(codigo);
		Set<Persona> duenios = edificio.duenios();
		for(Persona persona : duenios)
			resultado.add(persona.toView());
		return resultado;
	}
	
	/** OK */
	public List<PersonaView> inquilinosPorEdificio(int codigo) throws EdificioException, UnidadException, PersonaException {
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Edificio edificio = buscarEdificio(codigo);
		Set<Persona> inquilinos = edificio.inquilinos();
		for(Persona persona : inquilinos)
			resultado.add(persona.toView());
		return resultado;
	}

	/** OK */
	public List<PersonaView> habitantesPorEdificio(int codigo) throws EdificioException, UnidadException, PersonaException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Edificio edificio = buscarEdificio(codigo);
		Set<Persona> habitantes = edificio.habitantes();
		for(Persona persona : habitantes)
			resultado.add(persona.toView());
		return resultado;
	}

	/** OK */
	public List<PersonaView> dueniosPorUnidad(int codigo, String piso, String numero) throws UnidadException, EdificioException, PersonaException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		List<Persona> duenios = unidad.getDuenios();
		for(Persona persona : duenios)
			resultado.add(persona.toView());
		return resultado;
	}

	/** OK */
	public List<PersonaView> inquilinosPorUnidad(int codigo, String piso, String numero) throws UnidadException, EdificioException, PersonaException{
		List<PersonaView> resultado = new ArrayList<PersonaView>();
		Unidad unidad = buscarUnidad(codigo, piso, numero);
		List<Persona> inquilinos = unidad.getInquilinos();
		for(Persona persona : inquilinos)
			resultado.add(persona.toView());
		return resultado;
	}
	
	/** OK */
	private Edificio buscarEdificio(int codigo) throws EdificioException, UnidadException {
		return EdificioDAO.getInstancia().findByID(codigo);
	}
	/** OK */
	private Unidad buscarUnidad(int codigo, String piso, String numero) throws UnidadException, EdificioException{
		return UnidadDAO.getInstancia().findById(codigo, piso, numero);
	}	
	/** OK */
	private Persona buscarPersona(String documento) throws PersonaException {
		return PersonaDAO.getInstancia().findByID(documento);	
	}
	
	private int random () {
		
		int numero = (int) ((Math.random() * 10000) + 1) ;
		return numero;
	}
}
