package daos;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.PersonaEntity;
import entities.ReclamoEntity;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import hibernate.HibernateUtil;
import modelo.Persona;
import modelo.Reclamo;

public class ReclamosDAO {
	
	private static ReclamosDAO instancia;
	
	
private ReclamosDAO() { }
	
	public static ReclamosDAO getInstancia() {
		if(instancia==null)
			instancia = new ReclamosDAO();
		return instancia;
	}
	
	public List<Reclamo> getAll(){
		List<Reclamo> resultado = new ArrayList<Reclamo>();
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		List<ReclamoEntity> reclamo = s.createQuery("from ReclamoEntity").list();
		for(ReclamoEntity p : reclamo)
			resultado.add(toNegocio(p));
		s.getTransaction().commit();
		return resultado;
	}

	public Reclamo findByID(String documento) throws ReclamoException {
		Reclamo resultado = null;
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		ReclamoEntity reclamo = (ReclamoEntity) s.createQuery("from ReclamoEntity r where r.documento = ?").setString(0, documento).uniqueResult();
		s.getTransaction().commit();
		if(reclamo != null) {
			resultado = toNegocio(reclamo);
			return resultado;
		}
		else
			throw new ReclamoException("No existe un reclamo con el documento ingresado y detallado a continuacion:" +documento);
			
	}
	
	Reclamo toNegocio(ReclamoEntity r) {
		Reclamo reclamo = null;
		if(r!=null) {
			reclamo = new Reclamo(r.getIdReclamo(),r.getDocumento(),r.getCodigo(),r.getUbicacion(),r.getDescripcion(),r.getIdentificador());		}
		return reclamo;
	}
	
	ReclamoEntity toEntity(Reclamo r) {
		return new ReclamoEntity(r.getIdReclamo(),r.getDocumento(),r.getCodigo(),r.getUbicacion(),r.getDescripcion(),r.getIdentificador());
	}
	
	public void save(Reclamo r){ 
		ReclamoEntity pe = this.toEntity(r);
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		s.saveOrUpdate(pe);
		s.getTransaction().commit();
		r.setIdentificador(pe.getIdentificador());
	}
}
