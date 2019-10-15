package daos;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import entities.DetalleEntity;
import entities.UsuarioEntity;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import exceptions.UsuarioException;
import hibernate.HibernateUtil;
import modelo.DetalleReclamos;
import modelo.Usuario;

public class UsuarioDAO {
	
public static UsuarioDAO instancia;
	
	private UsuarioDAO() {}
	
	public static UsuarioDAO getInstancia() {
		if(instancia==null)
			instancia = new UsuarioDAO();
		return instancia;
	}
	

	public boolean Existe(String documento) throws UsuarioException{
		boolean B;
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		UsuarioEntity recuperado = (UsuarioEntity) s.createQuery("from UsuarioEntity where documento = ?").setString(0, documento).uniqueResult();	
		if (recuperado == null)
			B = false;
		else
			B = true;
		s.getTransaction().commit();
		return B;
	}
	
	public Usuario getUsuarioByDoc(String documento) throws UsuarioException{
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		UsuarioEntity recuperado = (UsuarioEntity) s.createQuery("from UsuarioEntity where documento = ?").setString(0, documento).uniqueResult();	
		s.getTransaction().commit();
		if(recuperado != null)
			return toNegocio(recuperado);
		else
			throw new UsuarioException("No existe el usuaio " + documento); 
	}

	
	Usuario toNegocio(UsuarioEntity detalle) {
		Usuario resultado = new Usuario(detalle.getDocumento(), detalle.getPassword());
		return resultado;
	}
	
	UsuarioEntity toEntity(Usuario r) {
		return new UsuarioEntity(r.getDocumento(), r.getPassword());
	}
	
	public void save(Usuario r){ 
		UsuarioEntity pe = this.toEntity(r);
		SessionFactory sf = HibernateUtil.getSessionFactory();
		Session s = sf.openSession();
		s.beginTransaction();
		s.saveOrUpdate(pe);
		s.getTransaction().commit();
}
}
