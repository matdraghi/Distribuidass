package views;

public enum Estado {

	nuevo, abierto, enProceso, desestimado, anulado, terminado ;
	
	public String getValue() {
		return this.toString();
	}
	
}
