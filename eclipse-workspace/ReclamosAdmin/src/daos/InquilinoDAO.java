package daos;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.InquilinoEntity;
import entities.ReclamosEntity;
import exceptions.InquilinoException;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import hibernate.HibernateUtil;
import modelo.Inquilinos;
import modelo.Persona;
import modelo.Reclamo;

public class InquilinoDAO {

	private static InquilinoDAO instancia;
	
	private InquilinoDAO() { }
	
	public static InquilinoDAO getInstancia() {
		if(instancia==null)
			instancia = new InquilinoDAO();
		return instancia;
	}

	public List<Persona> getInquilinosByUnidad(int id) throws PersonaException {
		List<Persona> resultado = new ArrayList<Persona>();
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		List<InquilinoEntity> inquilinos = (List<InquilinoEntity>) s.createQuery("from InquilinoEntity ie where ie.unidad.id = ?")
					.setInteger(0, id)
					.list();
		s.getTransaction().commit();
		if(inquilinos != null) {
			for(InquilinoEntity ie : inquilinos)
				resultado.add(PersonaDAO.getInstancia().toNegocio(ie.getPersona()));
			return resultado;		
		}
		else
			throw new PersonaException("No se pudo recuperar los inquilinos");
		
	}
	
	public Inquilinos findByID(String documento) throws InquilinoException, PersonaException {
		Inquilinos resultado = null;
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		InquilinoEntity re = (InquilinoEntity) s.createQuery("from InquilinoEntity i where i.persona = ?").setString(0, documento).uniqueResult();
		s.getTransaction().commit();
		if(re != null) {
			resultado = toNegocio(re);
			return resultado;
		}
		else
			throw new InquilinoException("No existe una Persona con el documento ingresado que sea inquilino del edificio:" + documento);
			
	}
	
	public List<Inquilinos> getAll(String documento){
		List<Inquilinos> resultado = new ArrayList<Inquilinos>();
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		List<InquilinoEntity> r =   s.createQuery("from InquilinoEntity i where i.persona = ?").setString(0, documento).list();
		for(InquilinoEntity p : r)
			resultado.add(toNegocio(p));
		s.getTransaction().commit();
		return resultado;
	}
	
	Inquilinos toNegocio(InquilinoEntity r) {
		Inquilinos re = null;
		if(r!=null) {
			re = new Inquilinos(r.getId(),r.getUnidad().getId(), r.getPersona().getDocumento());	
			}
		return re;
	}
}
