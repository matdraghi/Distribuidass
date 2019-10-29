package daos;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.DuenioEntity;
import entities.InquilinoEntity;
import entities.ReclamosEntity;
import exceptions.DuenioException;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import hibernate.HibernateUtil;
import modelo.Duenio;
import modelo.Inquilinos;
import modelo.Persona;
import modelo.Reclamo;

public class DuenioDAO {

	private static DuenioDAO instancia;
	
	private DuenioDAO() { }
	
	public static DuenioDAO getInstancia() {
		if(instancia==null)
			instancia = new DuenioDAO();
		return instancia;
	}

	public List<Persona> getDueniosByUnidad(int id) throws PersonaException {
		List<Persona> resultado = new ArrayList<Persona>();

		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		List<DuenioEntity> duenios = (List<DuenioEntity>) s.createQuery("from DuenioEntity de where de.unidad.id = ?")
					.setInteger(0, id)
					.list();
		s.getTransaction().commit();
		if(duenios != null) {
			for(DuenioEntity d : duenios)
				resultado.add(PersonaDAO.getInstancia().toNegocio(d.getPersona()));
			return resultado;		
		}
		else
			throw new PersonaException("No se pudo recuperar los duenios");
		
	}
	
	
	public List<Duenio> getUnidadesPorDuenio(String documento) throws PersonaException {
		List<Duenio> resultado = new ArrayList<Duenio>();

		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		List<DuenioEntity> duenios = s.createQuery("from DuenioEntity de where de.persona = ?").setString(0, documento).list();
		s.getTransaction().commit();
		if (duenios != null) {
		for(DuenioEntity p : duenios)
			resultado.add(toNegocio(p));
			return resultado;		
		}else
			throw new PersonaException("No se pudo recuperar los duenios");
		
	}
	
	public Duenio findByID(String documento) throws PersonaException, DuenioException {
		Duenio resultado = null;
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		DuenioEntity reclamo = (DuenioEntity) s.createQuery("from DuenioEntity r where r.persona = ?").setString(0, documento).uniqueResult();
		s.getTransaction().commit();
		if(reclamo != null) {
			resultado = toNegocio(reclamo);
			return resultado;
		}
		else
			throw new DuenioException("No existe un reclamo con el documento ingresado y detallado a continuacion:" +documento);
			
	}

	
	private Duenio toNegocio(DuenioEntity r) {
		// TODO Auto-generated method stub
		Duenio de = null;
		if (r!= null) {
			de =	new Duenio(r.getId(),r.getUnidad().getId(),r.getPersona().getDocumento().toString());
		}
			return 		de;
			
	
	}
	
	public List<Duenio> getAll(String documento){
		List<Duenio> resultado = new ArrayList<Duenio>();
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		List<DuenioEntity> r =   s.createQuery("from DuenioEntity i where i.persona = ?").setString(0, documento).list();
		for(DuenioEntity p : r)
			resultado.add(toNegocio(p));
		s.getTransaction().commit();
		return resultado;
	}
	
	
}
