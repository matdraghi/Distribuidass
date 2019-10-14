package daos;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.ImagenesEntity;
import entities.ReclamosEntity;
import exceptions.ImagenException;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import hibernate.HibernateUtil;
import modelo.Imagen;
import modelo.Reclamo;
import views.Estado;

public class ImagenDAO {
	
	private static ImagenDAO instancia;
	
	
	private ImagenDAO() { }
		
		public static ImagenDAO getInstancia() {
			if(instancia==null)
				instancia = new ImagenDAO();
			return instancia;
		}
		
		public List<Imagen> getAll(){
			List<Imagen> resultado = new ArrayList<Imagen>();
			SessionFactory sf = HibernateUtil.getSessionFactory();
			Session s = sf.getCurrentSession();
			s.beginTransaction();
			List<ImagenesEntity> r =   s.createQuery("from ImagenesEntity").list();
			for(ImagenesEntity p : r)
				resultado.add(toNegocio(p));
			s.getTransaction().commit();
			return resultado;
		}

		public Imagen findByID(int IdReclamo) throws ImagenException {
			Imagen resultado = null;
			SessionFactory sf = HibernateUtil.getSessionFactory();
			Session s = sf.getCurrentSession();
			s.beginTransaction();
			ImagenesEntity i = (ImagenesEntity) s.createQuery("from ImagenesEntity r where r.IdReclamo = ?").setLong(0, IdReclamo).uniqueResult();
			s.getTransaction().commit();
			if(i != null) {
				resultado = toNegocio(i);
				return resultado;
			}
			else
				throw new ImagenException("No existe un reclamo con el documento ingresado y detallado a continuacion:" + IdReclamo);
				
		}
		
		public Imagen findByNumero(int numero) throws ImagenException {
			Imagen resultado = null;
			SessionFactory sf = HibernateUtil.getSessionFactory();
			Session s = sf.getCurrentSession();
			s.beginTransaction();
			ImagenesEntity i = (ImagenesEntity) s.createQuery("from ImagenesEntity r where r.numero = ?").setLong(0, numero).uniqueResult();
			s.getTransaction().commit();
			if(i != null) {
				resultado = toNegocio(i);
				return resultado;
			}
			else
				throw new ImagenException("No existe un reclamo con el documento ingresado y detallado a continuacion:" + numero);
				
		}
		
		public Imagen findByName(String filename) throws ImagenException {
			Imagen resultado = null;
			SessionFactory sf = HibernateUtil.getSessionFactory();
			Session s = sf.getCurrentSession();
			s.beginTransaction();
			ImagenesEntity i = (ImagenesEntity) s.createQuery("from ImagenesEntity r where r.nombre = ?").setString(0, filename).uniqueResult();
			s.getTransaction().commit();
			if(i != null) {
				resultado = toNegocio(i);
				return resultado;
			}
			else
				throw new ImagenException("No existe un reclamo con el documento ingresado y detallado a continuacion:" + filename);
				
		}
		
		
		
		Imagen toNegocio(ImagenesEntity r) {
			Imagen i = null;
			if(r!=null) {
				i = new Imagen(r.getNumero(), r.getPath(), r.getTipo(), r.getNombre());	
				}
			return i;
		}
		
		ImagenesEntity toEntity(Imagen r) {
			return new ImagenesEntity(r.getNumero(),r.getPath(),r.getTipo(), r.getId(), r.getFile());
		}
		
		public void save(Imagen r){ 
			ImagenesEntity pe = this.toEntity(r);
			SessionFactory sf = HibernateUtil.getSessionFactory();
			Session s = sf.openSession();
			s.beginTransaction();
			s.saveOrUpdate(pe);
			s.getTransaction().commit();
		}
}
