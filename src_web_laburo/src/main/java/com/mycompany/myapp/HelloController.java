package com.mycompany.myapp;

import java.io.BufferedOutputStream;  
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.ServletContext;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
import javax.servlet.http.HttpSession;  
import org.apache.commons.fileupload.disk.DiskFileItemFactory;  
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;  
import org.springframework.web.bind.annotation.ModelAttribute;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RequestMethod;  
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;  
import org.springframework.web.servlet.ModelAndView;

import controlador.Controlador;
import daos.ReclamosDAO;
import dto.exception.ExceptionDTO;
import exceptions.ImagenException;
import exceptions.PersonaException;
import exceptions.ReclamoException;
import modelo.Imagen;  
  
@Controller  
public class HelloController {  
    private static final String UPLOAD_DIRECTORY ="/imagenes";  
    private static final Logger logger = LoggerFactory.getLogger(HelloController.class);
      
    @RequestMapping("uploadform")  
    public ModelAndView uploadForm(){  
        return new ModelAndView("uploadform");    
    }  
      
   /* @RequestMapping(value="sucess",method=RequestMethod.POST)  
    public ModelAndView saveimage( @RequestParam CommonsMultipartFile file,  
           HttpSession session) throws Exception{  
  
    ServletContext context = session.getServletContext();  
    String path = context.getRealPath(UPLOAD_DIRECTORY);  
    String filename = file.getOriginalFilename();  
  
    System.out.println(path+" "+filename);        
  
    byte[] bytes = file.getBytes();  
    BufferedOutputStream stream =new BufferedOutputStream(new FileOutputStream(  
         new File(path + File.separator + filename)));  
    stream.write(bytes);  
    stream.flush();  
    stream.close();  
           
    return new ModelAndView("uploadform","sucess","File successfully saved!");  
    }*/  
    
    @RequestMapping(value="/savefile",method=RequestMethod.POST)  
    public ResponseEntity<String> upload(@RequestParam CommonsMultipartFile file, HttpSession session) throws ReclamoException, ImagenException{  
    	
	    	ResponseEntity<String> response = null;
			JsonMapper mapper = new JsonMapper();
            String path=session.getServletContext().getRealPath("/");  
            String filename=file.getOriginalFilename();  
            String filetype = file.getContentType();
           

           // System.out.println("IdRe: " +IdReclamo);
            System.out.println("PATH: " +path);
            System.out.println("TIPO: " +filetype); // Me devuelve que tipo de imagen tengo
            /*
            try {
				ReclamosDAO.getInstancia().findByIDReclamo(IdReclamo);
			} catch (ReclamoException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (PersonaException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}*/
            
            int K = Controlador.getInstancia().CargarImagen(path.toString(), filetype.toString(), filename.toString());
             // viene aca 
            String C = path + filename ;
            System.out.println("Direccion en la Pc" + path+" "+filename + " ");  
            try{  
            byte barr[]=file.getBytes();  
              
            BufferedOutputStream bout=new BufferedOutputStream(  
                     new FileOutputStream(path+"/"+filename));  
            bout.write(barr);  
            bout.flush();  
            bout.close();  
            System.out.println (mapper.toJson(K));
            response = new ResponseEntity<String>(mapper.toJson(K), HttpStatus.CREATED);
            }catch(Exception e){System.out.println(e);}  
            System.out.println (response);
            return response;  
        }  
    
    @RequestMapping(value = "/Asociar", method = RequestMethod.GET)
    public ResponseEntity  handleFileUpload(@RequestParam (value="numero", required = true) int numero, @RequestParam (value="idReclamo", required = true) int IdReclamo) throws ReclamoException, ImagenException {
    	ResponseEntity<String> response = null;
    	JsonMapper mapper = new JsonMapper();
    		Boolean C = Controlador.getInstancia().CargarIdAImagen(numero, IdReclamo);
    		System.out.println (mapper.toJson(C));
    		response = new ResponseEntity<String>(mapper.toJson(C), HttpStatus.CREATED);
    		return response;
}
    
    @RequestMapping(value="/savefilee",method=RequestMethod.GET)  
    public ResponseEntity<String> upload(@RequestParam (value="file", required = true) String file, HttpSession session) throws ReclamoException, ImagenException{  
    	
	    	ResponseEntity<String> response = null;
			JsonMapper mapper = new JsonMapper();
			String C = file;
			System.out.println (C.length() - 40);
			String filee;
			filee = C.substring(C.length()-40, C.length());
			String path = C.substring(0, C.length()- 40);
			String tipo = C.substring(C.length() - 4); 
			System.out.println ("Tipo: " + tipo);
			System.out.println ("Path: " + path);
			System.out.println("file " + filee);
           

           // System.out.println("IdRe: " +IdReclamo);
            //System.out.println("PATH: " +path);
            //System.out.println("TIPO: " +filetype); // Me devuelve que tipo de imagen tengo
            /*
            try {
				ReclamosDAO.getInstancia().findByIDReclamo(IdReclamo);
			} catch (ReclamoException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (PersonaException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}*/

            System.out.println("Direccion en la Pc" + path+" "+filee + " "); 
            int J = Controlador.getInstancia().CargarImagen(path, tipo, filee);
            try{  
                byte barr[]=file.getBytes();  
                  
                BufferedOutputStream bout=new BufferedOutputStream(  
                         new FileOutputStream(path+"/"+filee));  
                bout.write(barr);  
                bout.flush();  
                bout.close();  
            System.out.println (mapper.toJson(J));
            response = new ResponseEntity<String>(mapper.toJson(J), HttpStatus.CREATED) ;
            }
            catch(Exception e){System.out.println(e);};
            return response;  
        }  
    
}