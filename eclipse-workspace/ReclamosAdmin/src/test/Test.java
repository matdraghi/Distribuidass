package test;

import java.util.List;

import controlador.Controlador;
import daos.InquilinoDAO;
import exceptions.EdificioException;
import exceptions.LoginException;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import exceptions.UnidadException;
import exceptions.UsuarioException;
import modelo.Reclamo;
import views.DetalleView;
import views.EdificioView;
import views.PersonaView;
import views.ReclamoView;
import views.UnidadView;
import views.Estado;
public class Test {

	public static void main(String[] args) throws EdificioException, UnidadException, PersonaException, ReclamoException {
		
		List<EdificioView> edificios = Controlador.getInstancia().getEdificios();
		System.out.println("Edificios " + edificios.size());
		
		List<UnidadView> unidades = Controlador.getInstancia().getUnidadesPorEdificio(1);
		System.out.println("\nUnidades por edificio " + unidades.size());
		
		List<PersonaView> p1 = Controlador.getInstancia().habitantesPorEdificio(1);
		System.out.println("\nHabitantes por Edificio " +  p1.size());
		
		List<PersonaView> p2 = Controlador.getInstancia().dueniosPorEdificio(1);
		System.out.println("\nDuenios por Edificio " +  p2.size());
				
		List<PersonaView> p3 = Controlador.getInstancia().inquilinosPorEdificio(1);		
		System.out.println("\nInquilinos por Edificio " +  p3.size());

		List<PersonaView> p4 = Controlador.getInstancia().habilitadosPorEdificio(1);		
		System.out.println("\nHabilitados por Edificio " +  p4.size());
		
		List<PersonaView> pu = Controlador.getInstancia().dueniosPorUnidad(1, "1", "1");
		System.out.println("\nDuenios por unidad " + pu.size());

		List<PersonaView> iu = Controlador.getInstancia().inquilinosPorUnidad(1, "1", "1");
		System.out.println("\nInquilinos por unidad " + iu.size());
		
		/** ESTA PROBADO QUE VA A LA BD */
		ReclamoView r = new ReclamoView ("DNI306043923",2,"San Martin 427", "FALLA5334S", 28);
		try {
			Controlador.getInstancia().altaReclamo(r);
		} catch (ReclamoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		/*
		DetalleView r1 = new DetalleView (32,228,822, "Floricientaaa");
		Controlador.getInstancia().SolicitarDetalles(r1.getCodigo(), r1.getPiso(), r1.getIdentificador(), r1.getUbicacion());;
		try {
			Controlador.getInstancia().login("DNI3001228", "123456778");
		} catch (LoginException | UsuarioException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
	}

}
