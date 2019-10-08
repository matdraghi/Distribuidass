package daos;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.InquilinoEntity;
import entities.ReclamosEntity;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import hibernate.HibernateUtil;
import modelo.Persona;
import modelo.Reclamo;
import views.Estado;

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
		List<ReclamosEntity> r =   s.createQuery("from ReclamosEntity").list();
		for(ReclamosEntity p : r)
			resultado.add(toNegocio(p));
		s.getTransaction().commit();
		return resultado;
	}

	public Reclamo findByID(String documento) throws ReclamoException, PersonaException {
		Reclamo resultado = null;
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		ReclamosEntity reclamo = (ReclamosEntity) s.createQuery("from ReclamosEntity r where r.documento = ?").setString(0, documento).uniqueResult();
		s.getTransaction().commit();
		if(reclamo != null) {
			resultado = toNegocio(reclamo);
			return resultado;
		}
		else
			throw new ReclamoException("No existe un reclamo con el documento ingresado y detallado a continuacion:" +documento);
			
	}
	
	public Reclamo findByIDReclamo(int IdReclamo) throws ReclamoException, PersonaException {
		Reclamo resultado = null;
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		ReclamosEntity reclamo = (ReclamosEntity) s.createQuery("from ReclamosEntity r where r.IdReclamo = ?").setLong(0, IdReclamo).uniqueResult();
		s.getTransaction().commit();
		if(reclamo != null) {
			resultado = toNegocio(reclamo);
			return resultado;
		}
		else
			throw new ReclamoException("No existe un reclamo con el documento ingresado y detallado a continuacion:" + IdReclamo);
			
	}
	
	
	Reclamo toNegocio(ReclamosEntity r) {
		Reclamo reclamo = null;
		if(r!=null) {
			reclamo = new Reclamo(r.getIdReclamo(),r.getDocumento(),r.getCodigo(),r.getUbicacion(),r.getDescripcion(),r.getIdentificador());		}
		return reclamo;
	}
	
	ReclamosEntity toEntity(Reclamo r) {
		Estado s = Estado.nuevo;
		return new ReclamosEntity(r.getIdReclamo(),r.getDocumento(),r.getCodigo(),r.getUbicacion(),r.getDescripcion(),r.getIdentificador(), s.toString());
	}
	
	public void save(Reclamo r){ 
		ReclamosEntity pe = this.toEntity(r);
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		if (r.getIdReclamo() == 0) {
			int Id = (int) s.save(pe);
			r.setIdReclamo(Id);
		}else {
				s.saveOrUpdate(pe);
		}
		s.getTransaction().commit();
		r.setIdentificador(pe.getIdentificador());
	}
	
	
	public List<Reclamo> findAllByEstado(Estado estado) {
		List<Reclamo> resultado = new ArrayList<Reclamo>();
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session session = sf.openSession();
		List<ReclamosEntity> auxiliar = session.createQuery("from ReclamosEntity where estado = ?0")
				.setParameter(0, estado.toString()).list();
		for (ReclamosEntity ae : auxiliar)
			resultado.add(toNegocio(ae));
		return resultado;
	}
}
