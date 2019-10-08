package modelo;

import java.util.ArrayList;
import java.util.List;

import daos.DuenioDAO;
import daos.InquilinoDAO;
import exceptions.PersonaException;
import exceptions.UnidadException;
import views.EdificioView;
import views.UnidadView;

public class Unidad {

	private int id;
	private String piso;
	private String numero;
	private boolean habitado;
	private Edificio edificio;
	private List<Persona> duenios;
	private List<Persona> inquilinos;
	
	public Unidad(int id, String piso, String numero, Edificio edificio) {
		this.id = id;
		this.piso = piso;
		this.numero = numero;
		this.habitado = false;
		this.edificio = edificio;
		this.duenios = new ArrayList<Persona>();
		this.inquilinos = new ArrayList<Persona>();
	}

	public void transferir(Persona nuevoDuenio) {
		duenios = new ArrayList<Persona>();
		duenios.add(nuevoDuenio);
	}
	
	public void agregarDuenio(Persona duenio) {
		duenios.add(duenio);
	}
	
	public void alquilar(Persona inquilino) throws UnidadException {
		if(!this.habitado) {
			this.habitado = true;
			inquilinos = new ArrayList<Persona>();
			inquilinos.add(inquilino);
		}
		else
			throw new UnidadException("La unidad esta ocupada");
	}

	public void agregarInquilino(Persona inquilino) {
		inquilinos.add(inquilino);
	}
	
	public boolean estaHabitado() {
		return habitado;
	}
	
	public void liberar() {
		this.inquilinos = new ArrayList<Persona>();
		this.habitado = false;
	}
	
	public void habitar() throws UnidadException {
		if(this.habitado)
			throw new UnidadException("La unidad ya esta habitada");
		else { 
			this.habitado = true;

		}
	}
	
	public int getId() {
		return id;
	}

	public String getPiso() {
		return piso;
	}

	public String getNumero() {
		return numero;
	}

	public Edificio getEdificio() {
		return edificio;
	}

	public List<Persona> getDuenios() throws UnidadException, PersonaException {
		if(duenios == null || duenios.size() == 0)
			duenios = DuenioDAO.getInstancia().getDueniosByUnidad(this.id);
		return duenios;
	}

	public List<Persona> getInquilinos() throws PersonaException {
		if(inquilinos == null || inquilinos.size() == 0)
			inquilinos = InquilinoDAO.getInstancia().getInquilinosByUnidad(this.id);
		return inquilinos;
	}

	public UnidadView toView() {
		EdificioView auxEdificio = edificio.toView();
		return new UnidadView(id, piso, numero, habitado, auxEdificio);
	}
}
