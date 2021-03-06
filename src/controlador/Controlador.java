package controlador;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
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
import modelo.Identificadores;
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
	public Boolean altaReclamo(String documento, int codigo, String ubicacion, String descripcion, int identificador, int piso, String nombre) throws ReclamoException, InquilinoException, PersonaException, DuenioException, EdificioException, UnidadException {
		// TODO Auto-generated method stub
		Boolean B = null;
		List<Inquilinos> i;
		i = InquilinoDAO.getInstancia().getAll(documento);
		
		String Doc = null;

		
		
		for (Inquilinos p2: i) {
			System.out.println("Id: " + p2.getId());
			System.out.println("Identificador: " + p2.getIdentificador());
			if (p2.getIdentificador()== identificador) {
				System.out.println(" " + identificador);	
				Unidad u = UnidadDAO.getInstancia().findByIdentificador(identificador);
				if (u.estaHabitado()) {
					B = true;
					Reclamo R = new Reclamo (documento, codigo, ubicacion, descripcion, identificador, Estado.nuevo, piso, nombre);
					R.save();
				}
					
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
				Unidad u = UnidadDAO.getInstancia().findByIdentificador(identificador);
				if (u.estaHabitado()) {
					B = true;
					Reclamo R = new Reclamo (documento, codigo, ubicacion, descripcion, identificador, Estado.nuevo, piso, nombre);
					R.save();
				}
			}
			System.out.println("-------------------------------------------------");
		}
		
		
		}
		return B;
	}
	
	
	public List<Identificadores> Identificadores (int codigo, String documento) throws PersonaException, EdificioException, UnidadException {
		int [] identif = new int [10];
		List<Identificadores> identificadores = new ArrayList<Identificadores>();
		List<Duenio> d = DuenioDAO.getInstancia().getUnidadesPorDuenio(documento);
		List <Inquilinos> inqui = InquilinoDAO.getInstancia().getUnidadesPorInquilino(documento);
		for (Duenio p2: d) {
			System.out.println("Identificadorrr: " + p2.getIdentificador());
			System.out.println("-------------------------------------------------");
		}
		
		for (Inquilinos p2: inqui) {
			System.out.println("Identificador Inquilino: " + p2.getIdentificador());
			System.out.println("-------------------------------------------------");
		}
		
		
		List<Unidad> j = UnidadDAO.getInstancia().getIdentificadoresPorCodigo(codigo);
		for (Unidad p2: j) {
			System.out.println("Identificador: " + p2.getId());
			System.out.println("-------------------------------------------------");
		}
		int i = 0;
		for (Duenio p2: d) {
			for (Unidad p3:j ) {
				if (p2.getIdentificador() == p3.getId()) {

					Identificadores ident = new Identificadores();
					String f = String.valueOf(p2.getIdentificador());
					System.out.println(f);
					System.out.println("ident" + ident.setIdentificador(f));
					
					//i++;
					String k = p3.getPiso();

					System.out.println ("piso:" + ident.setPiso(k));
					System.out.println(k);
					System.out.println ("aca" + ident.getIdentificador() + " " + ident.getPiso());
					identificadores.add(ident);
					i++;
					
				}
			}
		}
		
		for (Inquilinos p2: inqui) {
			for (Unidad p3:j ) {
				if (p2.getIdentificador() == p3.getId()) {

					Identificadores ident = new Identificadores();
					String f = String.valueOf(p2.getIdentificador());
					System.out.println(f);
					//identif [i] = f;
					System.out.println("ident" + ident.setIdentificador(f));
					
					//i++;
					String k = p3.getPiso();

					System.out.println ("piso:" + ident.setPiso(k));
					//int z = Integer.parseInt(k.trim());
					System.out.println(k);
					//identif [i] = z;
					System.out.println ("aca" + ident.getIdentificador() + " " + ident.getPiso());
					identificadores.add(ident);
					i++;
					
				}
			}
		}
		
		
		return identificadores;
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
	
	public List<Identificadores> nombre (String documento) throws PersonaException, EdificioException, UnidadException {
		int [] identif = new int [10];
		List<Identificadores> identificadores = new ArrayList<Identificadores>();

		List<Identificadores> aux = new ArrayList<Identificadores>();

		List<Identificadores> a = new ArrayList<Identificadores>();
		

		List<Identificadores> ab = new ArrayList<Identificadores>();

		List<Identificadores> prueba = new ArrayList<Identificadores>();
		List<Duenio> d = DuenioDAO.getInstancia().getUnidadesPorDuenio(documento);
		List <Inquilinos> inqui = InquilinoDAO.getInstancia().getUnidadesPorInquilino(documento);
		for (Duenio p2: d) {

			Identificadores p = new Identificadores();
			System.out.println("Identificadorrr: " + p2.getIdentificador());
			p.setIdentificador(String.valueOf(p2.getIdentificador()));
			prueba.add(p);
			System.out.println("-------------------------------------------------");
		}
		
		for (Inquilinos p2: inqui) {

			Identificadores p = new Identificadores();
			System.out.println("Identificador inquilino: " + p2.getIdentificador());
			p.setIdentificador(String.valueOf(p2.getIdentificador()));
			prueba.add(p);
		}
		
		for (Identificadores p4: prueba) {
			
		
		Unidad je = UnidadDAO.getInstancia().getCodigoPorIdentificador(Integer.valueOf(p4.getIdentificador()));
		if (je != null) {
			System.out.println("Identificador: " + je.getId());
			System.out.println("-------------------------------------------------");
		}
		
		int i = 0;
		for (Duenio p2: d) {
				if (p2.getIdentificador() == je.getId()) {

					Identificadores ident = new Identificadores();
					String f = String.valueOf(p2.getIdentificador());
					System.out.println(f);
					Unidad u = UnidadDAO.getInstancia().findByIdentificador(Integer.parseInt(f));
					int codigoEdi= u.getEdificio().getCodigo();
					Edificio e = EdificioDAO.getInstancia().findByID(codigoEdi);
					String nombre = e.getNombre();
					String ubicacion = e.getDireccion();
					System.out.println("ident" + ident.setIdentificador(f));

					System.out.println("ident" + ident.setNombre(nombre));
					

					System.out.println("ident" + ident.setUbicacion(ubicacion));
					
					//i++;
					String k = je.getPiso();
					ident.setDocumento(documento);

					System.out.println ("piso:" + ident.setPiso(k));
					System.out.println(k);
					System.out.println ("aca" + ident.getIdentificador() + " " + ident.getPiso());
					identificadores.add(ident);
					i++;
					
				}
			}
		
		for (Inquilinos p2: inqui) {
				if (p2.getIdentificador() == je.getId()) {

					Identificadores ident = new Identificadores();
					String f = String.valueOf(p2.getIdentificador());
					System.out.println(f);
					//identif [i] = f;Unidad u = UnidadDAO.getInstancia().findByIdentificador(Integer.parseInt(f));
					Unidad u = UnidadDAO.getInstancia().findByIdentificador(Integer.parseInt(f));
					
					int codigoEdi= u.getEdificio().getCodigo();
					Edificio e = EdificioDAO.getInstancia().findByID(codigoEdi);
					String nombre = e.getNombre();
					String ubicacion = e.getDireccion();
					System.out.println("ident" + ident.setIdentificador(f));

					System.out.println("ident" + ident.setNombre(nombre));
					
					ident.setDocumento(documento);
					System.out.println("ident" + ident.setUbicacion(ubicacion));
					
					//i++;
					String k = je.getPiso();

					System.out.println ("piso:" + ident.setPiso(k));
					//int z = Integer.parseInt(k.trim());
					System.out.println(k);
					//identif [i] = z;
					System.out.println ("aca" + ident.getIdentificador() + " " + ident.getPiso());
					identificadores.add(ident);
					i++;
					
				}
		}
		}
		
		Identificadores identifa = new Identificadores();
		for(int i = 0; i < identificadores.size(); i++)
		{
			for(int j = 0; j < identificadores.size(); j++)
			{
				if (i < identificadores.size() && j < identificadores.size()) {
				if(identificadores.get(i).getNombre().contentEquals(identificadores.get(j).getNombre()) && i != j)
				{
					identificadores.remove(j);
				}
				}
			}
		}
		/*for (int i = 0; i < identificadores.size(); i++)
	    {
	        	Identificadores identifa = new Identificadores();
	        	String nombre1 = identificadores.get(i).getNombre();
	        	int j = i + 1;
	        	if (j <identificadores.size()) {
	        	String nombre2 = identificadores.get(j).getNombre();
	        	if (!nombre1.equalsIgnoreCase(nombre2)) {
	        		identifa.setNombre(nombre1);
	        		aux.add(identifa);
	        	}	
	        	
	        	}
	        }
		
		for (int i = 0; i < aux.size(); i++)
	    {
	        	Identificadores identifa = new Identificadores();
	        	String nombre1 = identificadores.get(i).getNombre();
	        	int j = i + 1;
	        	if (j <identificadores.size()) {
	        	String nombre2 = identificadores.get(j).getNombre();
	        	if (nombre1.equalsIgnoreCase(nombre2)) {
	        		aux.remove(j);
	        	}
	        	else {
	        		identifa.setNombre(nombre1);
	        		a.add(identifa);
	        	}
	        	}
	        }
		
		   for (Identificadores e : a) {
		        if (!ab.contains(e.getNombre())) {
		            System.out.println(e.getNombre());
		            ab.add(e);
		        }
		    }*/
		return identificadores;
	}
	
	public boolean RegistrarUsuario (String documento, String contraseņa) throws InquilinoException, PersonaException, DuenioException, ReclamoException, UsuarioException {
		Persona p;
		p = PersonaDAO.getInstancia().findByID(documento);
		
		Boolean C = UsuarioDAO.getInstancia().Existe(documento) ;
		
		if(p != null) {
			if (C == false) {
					Usuario us = new Usuario (documento, contraseņa);
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
	
	public Imagen CargarIdAImagen (int numero, int idReclamo) throws ImagenException {
		Imagen n = ImagenDAO.getInstancia().findByNumero(numero);
		System.out.println (n.getNumero() + " " + n.getId() + " " + n.getPath() + " " + n.getTipo() + " " + n.getFile());
		int r = numero -1;
		Imagen s = ImagenDAO.getInstancia().findByNumero(r);
		System.out.println (s.getFile());
		int k = n.setId(idReclamo);
		String file = n.setFile(s.getFile());
		System.out.println (k);
		n.save();
		return s;
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
			Reclamo r = new Reclamo();
			if (p1.getDocumento().equals(documento)) {
		
			String f = String.valueOf(p1.getIdReclamo());
			System.out.println(f);
			r.setidRe(f);
			System.out.println("aaaaa " + p1.getIdRe());
			resultado.add(r);
			}
		}
		
		for (Reclamo p2: resultado) {
			System.out.println("IdReclamo: " + p2.getIdRe());
			/*System.out.println("Documento: " + p2.getDocumento());
			System.out.println("Codigo: " + p2.getCodigo());
			System.out.println("Ubicacion: " + p2.getUbicacion());
			System.out.println("Descripcion: " + p2.getDescripcion());
			System.out.println("Identificador: " + p2.getIdentificador());

			System.out.println("Estado: " + p2.getEstado());*/
			
			System.out.println("-------------------------------------------------");
		}
		return resultado;
	}
	
	public List<Imagen> ObtenerImag (int IdReclamo) throws ImagenException {
		List<Imagen> resultado = new ArrayList<Imagen>();
		resultado  = ImagenDAO.getInstancia().findByID(IdReclamo);
		for (Imagen p: resultado) {
			System.out.println("PATH: " + p.getPath());

			System.out.println("File: " + p.getFile());
			

			System.out.println("Tipo: " + p.getTipo());
			
		}
		
		return resultado;
	}
	
	public List<Identificadores> pisos (int codigo, String documento) throws PersonaException, EdificioException, UnidadException {
		List<Identificadores> identificadores = new ArrayList<Identificadores>();
		List<Identificadores> pisos = new ArrayList<Identificadores>();
		List<Duenio> d = DuenioDAO.getInstancia().getUnidadesPorDuenio(documento);
		List <Inquilinos> inqui = InquilinoDAO.getInstancia().getUnidadesPorInquilino(documento);
		for (Duenio p2: d) {
			System.out.println("Identificadorrr: " + p2.getIdentificador());
			System.out.println("-------------------------------------------------");
		}
		
		for (Inquilinos p2: inqui) {
			System.out.println("Identificador Inquilino: " + p2.getIdentificador());
			System.out.println("-------------------------------------------------");
		}
		
		
		List<Unidad> j = UnidadDAO.getInstancia().getIdentificadoresPorCodigo(codigo);
		for (Unidad p2: j) {
			System.out.println("Identificador: " + p2.getId());
			System.out.println("-------------------------------------------------");
		}
		int i = 0;
		for (Duenio p2: d) {
			for (Unidad p3:j ) {
				System.out.println("aca estoy");
				Identificadores ident = new Identificadores();
				String f = String.valueOf(p2.getIdentificador());
				System.out.println(f);
				String g = String.valueOf(p3.getId());
				System.out.println(g);
				if (f.equals(g)) {

					System.out.println("ident" + ident.setIdentificador(f));
					
					//i++;
					String k = p3.getPiso();

					System.out.println ("piso:" + ident.setPiso(k));
					System.out.println(k);
					System.out.println ("aca" + ident.getIdentificador() + " " + ident.getPiso());
					identificadores.add(ident);
					i++;
					
				}
			}
		}
		int q = 0;
		for (Inquilinos p2: inqui) {
			for (Unidad p3:j ) {
				if (p2.getIdentificador() == p3.getId()) {

					Identificadores ident = new Identificadores();
					String f = String.valueOf(p2.getIdentificador());
					System.out.println(f);
					//identif [i] = f;
					System.out.println("ident" + ident.setIdentificador(f));
					
					//i++;
					String k = p3.getPiso();

					System.out.println ("piso:" + ident.setPiso(k));
					//int z = Integer.parseInt(k.trim());
					System.out.println(k);
					//identif [i] = z;
					System.out.println ("aca" + ident.getIdentificador() + " " + ident.getPiso());
					identificadores.add(ident);
					i++;
					q++;
					System.out.println(q);
				}
			}
		}
		
		System.out.println ("Largo:  " + q);
		String mayor = identificadores.get(0).getPiso();
		int ma = Integer.parseInt(mayor);
		System.out.println("Mayor: " + ma);
		String menor = "1";
		for (int p = 0; p < ma; p++) {

			Identificadores ident = new Identificadores();
			if (p == 0) {
				System.out.println("entre");
				ident.setPiso(menor);
				pisos.add(ident);
			}
			if (p > 0 && p < ma) {
				String u = String.valueOf(p+ 1);
				ident.setPiso(u);
				pisos.add(ident);
			}
			
		}
		
		for (Identificadores p2: pisos) {
			System.out.println ("PISO:  " + p2.getPiso());
		}
		
		
		return pisos;
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
