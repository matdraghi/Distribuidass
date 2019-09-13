package daos;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.DuenioEntity;
import exceptions.PersonaException;
import hibernate.HibernateUtil;
import modelo.Persona;

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
	
	
	
}
