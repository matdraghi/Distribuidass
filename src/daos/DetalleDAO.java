package daos;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.DetalleEntity;
import entities.ReclamosEntity;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import hibernate.HibernateUtil;
import modelo.DetalleReclamos;
import modelo.Reclamo;

public class DetalleDAO {
	
	public static DetalleDAO instancia;
	
	public static DetalleDAO getInstancia() {
		if(instancia==null)
			instancia = new DetalleDAO();
		return instancia;
	}
	

	public DetalleReclamos findByID(int codigo) throws ReclamoException, PersonaException {
		DetalleReclamos resultado = null;
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.getCurrentSession();
		s.beginTransaction();
		DetalleEntity detalle = (DetalleEntity) s.createQuery("from DetalleEntity r where r.documento = ?").setLong(0, codigo).uniqueResult();
		s.getTransaction().commit();
		if(detalle != null) {
			resultado = toNegocio(detalle);
			return resultado;
		}
		else
			throw new ReclamoException("No existe un reclamo con el documento ingresado y detallado a continuacion:" + codigo);
			
	}
	
	
	
	DetalleReclamos toNegocio(DetalleEntity r) {
		DetalleReclamos reclamo = null;
		if(r!=null) {
			reclamo = new DetalleReclamos(r.getId(),r.getCodigo(),r.getPiso(),r.getIdentificador(), r.getUbicacion());	
			}
		return reclamo;
	}
	
	DetalleEntity toEntity(DetalleReclamos r) {
		return new DetalleEntity(r.getId(),r.getCodigo(),r.getPiso(),r.getIdentificador(), r.getUbicacion());
	}
	
	public void save(DetalleReclamos r){ 
		DetalleEntity pe = this.toEntity(r);
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		s.saveOrUpdate(pe);
		s.getTransaction().commit();
		r.setIdentificador(pe.getIdentificador());
}

}
