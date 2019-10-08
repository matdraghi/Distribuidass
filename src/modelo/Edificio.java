package modelo;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import daos.UnidadDAO;
import exceptions.EdificioException;
import exceptions.PersonaException;
import exceptions.UnidadException;
import views.EdificioView;

public class Edificio {
	
	private int codigo;
	private String nombre;
	private String direccion;
	private List<Unidad> unidades;
	
	public Edificio(int codigo, String nombre, String direccion) {
		this.codigo = codigo;
		this.nombre = nombre;
		this.direccion = direccion;
	}
	
	public void agregarUnidad(Unidad unidad) throws UnidadException, EdificioException {
		if(unidades == null || unidades.size()==0)
			unidades = UnidadDAO.getInstancia().getUnidadesByEdificio(this);
		unidades.add(unidad);
	}
	
	public Set<Persona> habilitados() throws UnidadException, PersonaException, EdificioException{
		Set<Persona> habilitados = new HashSet<Persona>();
		unidades = UnidadDAO.getInstancia().getUnidadesByEdificio(this);
		for(Unidad unidad : unidades) {
			List<Persona> duenios = unidad.getDuenios();
			for(Persona p : duenios)
				habilitados.add(p);
			List<Persona> inquilinos = unidad.getInquilinos();
			for(Persona p : inquilinos)
				habilitados.add(p);
		}
		return habilitados;
	}

	public int getCodigo() {
		return codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public String getDireccion() {
		return direccion;
	}

	public List<Unidad> getUnidades() throws UnidadException, EdificioException{
		if(unidades == null || unidades.size() == 0) {
			unidades = UnidadDAO.getInstancia().getUnidadesByEdificio(this);
		}
		return unidades;
	}

	public Set<Persona> duenios() throws UnidadException, PersonaException, EdificioException {
		Set<Persona> resultado = new HashSet<Persona>();
		if(unidades == null || unidades.size() == 0)
			unidades = UnidadDAO.getInstancia().getUnidadesByEdificio(this);
		for(Unidad unidad : unidades) {
			List<Persona> duenios = unidad.getDuenios();
			for(Persona p : duenios)
				resultado.add(p);
		}
		return resultado;
	}

	public Set<Persona> inquilinos() throws UnidadException, EdificioException, PersonaException {
		Set<Persona> resultado = new HashSet<Persona>();
		if(unidades == null || unidades.size() == 0)
			unidades = UnidadDAO.getInstancia().getUnidadesByEdificio(this);
		for(Unidad unidad : unidades) {
			if(unidad.estaHabitado()) {
				List<Persona> inquilinos = unidad.getInquilinos();
				for(Persona p : inquilinos)
					resultado.add(p);
				}
		}
		return resultado;
	}
	
	public Set<Persona> habitantes() throws UnidadException, PersonaException, EdificioException {
		Set<Persona> resultado = new HashSet<Persona>();
		if(unidades == null || unidades.size() == 0)
			unidades = UnidadDAO.getInstancia().getUnidadesByEdificio(this);
		for(Unidad unidad : unidades) {
			if(unidad.estaHabitado()) {
				List<Persona> inquilinos = unidad.getInquilinos();
				if(inquilinos.size() > 0) 
					for(Persona p : inquilinos)
						resultado.add(p);
				else {
					List<Persona> duenios = unidad.getDuenios();
					for(Persona p : duenios)
						resultado.add(p);
				}
			}
		}
		return resultado;
	}

	public EdificioView toView() {
		return new EdificioView(codigo, nombre, direccion);
	}


}
