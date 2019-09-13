package daos;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.InquilinoEntity;
import exceptions.PersonaException;
import hibernate.HibernateUtil;
import modelo.Persona;

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
}
