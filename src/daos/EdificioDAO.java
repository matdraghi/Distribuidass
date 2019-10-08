package daos;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.EdificioEntity;
import entities.UnidadEntity;
import exceptions.EdificioException;
import exceptions.UnidadException;
import hibernate.HibernateUtil;
import modelo.Edificio;
import modelo.Unidad;

public class EdificioDAO {

	private static EdificioDAO instancia;
	
	private EdificioDAO() { }
	
	public static EdificioDAO getInstancia() {
		if(instancia==null)
			instancia = new EdificioDAO();
		return instancia;
	}

	public List<Edificio> getAll() throws EdificioException, UnidadException{
		List<Edificio> resultado = new ArrayList<Edificio>();
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		List<EdificioEntity> edificios = s.createQuery("from EdificioEntity").list();
		for(EdificioEntity e : edificios)
			resultado.add(toNegocio(e));
		s.getTransaction().commit();
		return resultado;
	}

	public Edificio findByID(int codigo) throws EdificioException, UnidadException {
		Edificio resultado = null;
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		EdificioEntity edificio = (EdificioEntity)s.createQuery("from EdificioEntity e where e.codigo = ?").setInteger(0, codigo).uniqueResult();
		if(edificio != null)
			resultado = toNegocio(edificio);
		return resultado;
	}
	
	Edificio toNegocio(EdificioEntity e) throws EdificioException, UnidadException {
		if(e != null) {
			Edificio edificio = new Edificio(e.getCodigo(), e.getNombre(), e.getDireccion());
			return edificio;
		}
		else
			throw new EdificioException("No se pudo recuperar los edificios");
	}
}
