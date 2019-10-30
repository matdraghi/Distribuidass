package modelo;

import daos.ImagenDAO;
import daos.UsuarioDAO;

public class Imagen {
	
	private int id;
	private String file;
	private String nombre;
	public Imagen(int numero, String path, String tipo, String filename ) {
		super();

		this.numero = numero;
		this.path = path;
		this.tipo = tipo;
		this.file = filename;
	}
	
	public Imagen(String path, String tipo, String filename ) {
		super();
		this.path = path;
		this.tipo = tipo;
		this.file = filename;
	}
	public Imagen(int numero, String path, String tipo, int i, String filename) {
		super();
		this.numero = numero;
		this.path = path;
		this.tipo = tipo;
		this.id = i;
		this.file = filename;
	}
	private int numero;
	private String path;
	private String tipo;
	public int getNumero() {
		return numero;
	}
	public void setNumero(int numero) {
		this.numero = numero;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	
	public void save() {
		// TODO Auto-generated method stub
		ImagenDAO.getInstancia().save(this);
	}
	public int getId() {
		return id;
	}
	public int setId(int id) {
		return this.id = id;
	}
	public String getFile() {
		return file;
	}
	public String setFile(String file) {
		return this.file = file;
	}
	
}
