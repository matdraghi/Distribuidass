package hibernate;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;

import entities.DetalleEntity;
import entities.DuenioEntity;
import entities.EdificioEntity;
import entities.ImagenesEntity;
import entities.InquilinoEntity;
import entities.PersonaEntity;
import entities.ReclamosEntity;
import entities.UnidadEntity;
import entities.UsuarioEntity;

public class HibernateUtil
{
    private static final SessionFactory sessionFactory;
    static
    {
        try
        {
        	 AnnotationConfiguration config = new AnnotationConfiguration();
        	 config.addAnnotatedClass(PersonaEntity.class);
        	 config.addAnnotatedClass(UnidadEntity.class);
        	 config.addAnnotatedClass(EdificioEntity.class);
        	 config.addAnnotatedClass(DuenioEntity.class);
        	 config.addAnnotatedClass(InquilinoEntity.class);
        	 config.addAnnotatedClass(ReclamosEntity.class);
        	 config.addAnnotatedClass(DetalleEntity.class);
        	 config.addAnnotatedClass(ImagenesEntity.class);
        	 config.addAnnotatedClass(UsuarioEntity.class);
             sessionFactory = config.buildSessionFactory();
        }
        catch (Throwable ex)
        {
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }
 
    public static SessionFactory getSessionFactory()
    {
        return sessionFactory;
    }
}
