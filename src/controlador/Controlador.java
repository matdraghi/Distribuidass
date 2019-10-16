package controlador;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import daos.DuenioDAO;
import daos.EdificioDAO;
import daos.ImagenDAO;
import daos.InquilinoDAO;
import daos.PersonaDAO;
import daos.ReclamosDAO;
import daos.UnidadDAO;
import daos.UsuarioDAO;
import exceptions.DocumentException;
import exceptions.DuenioException;
import exceptions.EdificioException;
import exceptions.ImagenException;
import exceptions.InquilinoException;
import exceptions.LoginException;
import exceptions.NombreException;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import exceptions.UnidadException;
import exceptions.UsuarioException;
import modelo.Edificio;
import modelo.Imagen;
import modelo.Inquilinos;
import modelo.Persona;
import modelo.Reclamo;
import modelo.DetalleReclamos;
import modelo.Duenio;
import modelo.Unidad;
import modelo.Usuario;
import views.EdificioView;
import views.Estado;
import views.PersonaView;
import views.ReclamoView;
import views.UnidadView;

public class Controlador {

	private static Controlador instancia;
	
	private String Docum;
	
	private Controlador() { }
	
	public static Controlador getInstancia() {
		if(instancia == null)
			instancia = new Controlador();
		return instancia;
	}
	
	// agregado por grupo Ya Anda
	public boolean ValidarRegistroPersona(String Documento, String Nombre) throws DocumentException, NombreException, PersonaException, InquilinoException {
		Persona persona = PersonaDAO.getInstancia().findByID(Documento);
		//Inquilinos i;
		//InquilinoDAO.getInstancia().findByID(Documento);
		
		List<Inquilinos> i;
		i = InquilinoDAO.getInstancia().getAll(Documento);
		String Doc = null;

		
		
		for (Inquilinos p2: i) {
			System.out.println("Id: " + p2.getId());
			System.out.println("Identificador: " + p2.getIdentificador());
			System.out.println("Documento: " + p2.getDocumento());
			Doc = p2.getDocumento();
			System.out.println("-------------------------------------------------");
		}
		
		System.out.println(Doc);
		if(Documento.equals(Doc)) {
			
			System.out.println("El usario es un inquilino del edificio");
		} 
		else 
		{
		throw new InquilinoException("El usuario ingresado no es valido, vuelva a ingresar");
		}
		String c = persona.getNombre();
		if(persona.getDocumento().equals(Documento)){
		
			System.out.println (persona.getNombre());

			System.out.println (Nombre);
			
			String k = "";
			
			for (int y=0; y < Nombre.length(); y++) { //Hay que quitarle el espacio al APELLIDO, NOMBRE que copio de la BD
				if (Nombre.charAt(y) != ' ')
				    k += Nombre.charAt(y);
				}
			
			String s = "";
			for (int x=0; x < persona.getNombre().length(); x++) { //que recorrer el arreglo para verificar que ambas cadenas tuvieran el mismo largo
				if (persona.getNombre().charAt(x) != ' ')
				    s += persona.getNombre().charAt(x);
				}
			int H = s.length();
			System.out.println(H); // Debido a que recibimos un varchar de la BD poseia mas espacio, tuvimos
			int I = k.length();
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
	public Boolean altaReclamo(String documento, int codigo, String ubicacion, String descripcion, int identificador, int piso, String nombre) throws ReclamoException, InquilinoException, PersonaException, DuenioException {
		// TODO Auto-generated method stub
		Boolean B = null;
		List<Inquilinos> i;
		i = InquilinoDAO.getInstancia().getAll(documento);
		
		String Doc = null;

		
		for (Inquilinos p2: i) {
			System.out.println("Id: " + p2.getId());
			System.out.println("Identificador: " + p2.getIdentificador());
			if (p2.getIdentificador()== identificador) {
				System.out.println("Alquila dicha unidad" + identificador);				
				B = false;
			}
			System.out.println("Documento: " + p2.getDocumento());
			Doc = p2.getDocumento();
			System.out.println("-------------------------------------------------");
		}
		
		if (B == null) {
		List<Duenio> d;
		d = DuenioDAO.getInstancia().getAll(documento);
		
		String Docu = null;

		
		for (Duenio p2: d) {
			System.out.println("Id: " + p2.getDocumento());
			Doc = p2.getDocumento();

			System.out.println("Identificador de duenio " + p2.getIdentificador());
			if (p2.getIdentificador()== identificador) {
				System.out.println("Duenio dicha unidad" + identificador);
				Reclamo R = new Reclamo (documento, codigo, ubicacion, descripcion, identificador, Estado.nuevo, piso, nombre);
				R.save();
				B = true;
			}
			System.out.println("-------------------------------------------------");
		}
		
		
		}
		return B;
	}
	
	public void SetDocumento (String documento) {
		Docum = documento;
	}
	
	public String GetDocumento () {
		return Docum;
	}
	public Boolean altaReclamoEdificio(String documento, int codigo, String ubicacion, String descripcion, int piso, String nombre) throws ReclamoException, InquilinoException, PersonaException, DuenioException {
		Reclamo R = new Reclamo (documento, codigo, ubicacion, descripcion,Estado.nuevo, piso,  nombre);
		R.save();
		return false;
	}
	
	public boolean RegistrarUsuario (String documento, String contraseña) throws InquilinoException, PersonaException, DuenioException, ReclamoException, UsuarioException {
		Persona p;
		p = PersonaDAO.getInstancia().findByID(documento);
		
		Boolean C = UsuarioDAO.getInstancia().Existe(documento) ;
		
		if(p != null) {
			if (C == false) {
					Usuario us = new Usuario (documento, contraseña);
					us.save();
					return true;
				}
			else if (C == true) {
				return false;
			}
			}
		return false;
	}
	
	public int CargarImagen (String path, String tipo, String filename) throws ReclamoException, ImagenException {
		Imagen e = new Imagen (path, tipo, filename);
		e.save();
		
		Imagen n = ImagenDAO.getInstancia().findByName(filename);
		return n.getNumero();
		
	}
	
	public boolean CargarIdAImagen (int numero, int idReclamo) throws ImagenException {
		Imagen n = ImagenDAO.getInstancia().findByNumero(numero);
		System.out.println (n.getNumero() + " " + n.getId() + " " + n.getPath() + " " + n.getTipo() + " " + n.getFile());
		int k = n.setId(idReclamo);
		System.out.println (k);
		n.save();
		return true;
	}
	public boolean login(String documento, String password) throws LoginException, UsuarioException{
		Usuario u = UsuarioDAO.getInstancia().getUsuarioByDoc(documento);
		if(u.getPassword().equals(password)){
			System.out.println("ENTRE");
			return true;
		}
		else{
			throw new LoginException("Los datos ingresado no son corrector, reingrese");
		}
	}
	
	/** ANDA Agregado por Grupo */
	public  List<Reclamo> ConsultarReclamo(String documento) throws PersonaException, ReclamoException {
		Persona p = PersonaDAO.getInstancia().findByID(documento);

		List<Reclamo> resultado = new ArrayList<Reclamo>();
		List<Reclamo> aux = ReclamosDAO.getInstancia().getAll();
		
		for (Reclamo p1: aux) {
			if (p1.getDocumento().equals(documento)) {
			resultado.add(p1);
			}
		}
		
		for (Reclamo p2: resultado) {
			System.out.println("IdReclamo: " + p2.getIdReclamo());
			System.out.println("Documento: " + p2.getDocumento());
			System.out.println("Codigo: " + p2.getCodigo());
			System.out.println("Ubicacion: " + p2.getUbicacion());
			System.out.println("Descripcion: " + p2.getDescripcion());
			System.out.println("Identificador: " + p2.getIdentificador());

			System.out.println("Estado: " + p2.getEstado());
			System.out.println ("Piso: " + p2.getP());
			
			System.out.println("-------------------------------------------------");
		}
		return resultado;
	}
	
	public  List<Reclamo> ObtenerIdReclamos(String documento) throws PersonaException, ReclamoException {

		List<Reclamo> resultado = new ArrayList<Reclamo>();
		List<Reclamo> aux = ReclamosDAO.getInstancia().getAll();
		
		for (Reclamo p1: aux) {
			if (p1.getDocumento().equals(documento)) {
			resultado.add(p1);
			}
		}
		
		for (Reclamo p2: resultado) {
			System.out.println("IdReclamo: " + p2.getIdReclamo());
			System.out.println("Documento: " + p2.getDocumento());
			System.out.println("Codigo: " + p2.getCodigo());
			System.out.println("Ubicacion: " + p2.getUbicacion());
			System.out.println("Descripcion: " + p2.getDescripcion());
			System.out.println("Identificador: " + p2.getIdentificador());

			System.out.println("Estado: " + p2.getEstado());
			
			System.out.println("-------------------------------------------------");
		}
		return resultado;
	}
	
	public  int ObtenerId(String documento, String nombre, String descripcion, int piso) throws PersonaException, ReclamoException {

		Reclamo Aux= ReclamosDAO.getInstancia().Obtener(documento, nombre, descripcion, piso);
		int resultado = Aux.getIdReclamo();
		return resultado;
	}
	
	public String SolicitarDetalles ( int codigo, int piso, int identificador, String ubicacion) {
		DetalleReclamos w = new DetalleReclamos (codigo, piso, identificador, ubicacion);
		w.save();
		return ubicacion;
	}
	
	
	
	
	
	public List<UnidadView> getUnidadesPorEdif(String nombre) throws EdificioException, UnidadException{
		List<UnidadView> resultado = new ArrayList<UnidadView>();
		Edificio edificio = buscarCodig(nombre);
		List<Unidad> unidades = edificio.getUnidades();
		for(Unidad unidad : unidades)
			resultado.add(unidad.toView());
		return resultado;
	}
	
	private Edificio buscarCodig(String nombre)throws EdificioException, UnidadException {
		return EdificioDAO.getInstancia().findCode(nombre);
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
