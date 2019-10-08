package com.mycompany.myapp;

import java.io.BufferedOutputStream;  
import java.io.File;  
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
import exceptions.PersonaException;
import exceptions.ReclamoException;  
  
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
    
    @RequestMapping(value="/savefile",method=RequestMethod.GET)  
    public ModelAndView upload(@RequestParam CommonsMultipartFile file,HttpSession session){  
    	//@RequestParam(value = "IdReclamo", required = true) int IdReclamo
            String path=session.getServletContext().getRealPath("/");  
            String filename=file.getOriginalFilename();  
            String filetype = file.getContentType();
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
            
            try {
				Controlador.getInstancia().CargarImagen(path.toString(), filetype.toString());
			} catch (ReclamoException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
             // viene aca
            System.out.println("Direccion en la Pc" + path+" "+filename);  
            try{  
            byte barr[]=file.getBytes();  
              
            BufferedOutputStream bout=new BufferedOutputStream(  
                     new FileOutputStream(path+"/"+filename));  
            bout.write(barr);  
            bout.flush();  
            bout.close();  
              
            }catch(Exception e){System.out.println(e);}  
            return new ModelAndView("index","filename",path+"/"+filename);  
        }  
    
    @RequestMapping(value = "/Foto", method = RequestMethod.POST)
    public ResponseEntity  handleFileUpload(@RequestParam("file") MultipartFile file) throws IllegalStateException, IOException {
    	ResponseEntity<String> response = null;
            System.out.printf("File name=%s, size=%s\n", file.getOriginalFilename(),file.getSize());
            //creating a new file in some local directory
            File fileToSave = new File("C:\\test\\" + file.getOriginalFilename());
            //copy file content from received file to new local file
            file.transferTo(fileToSave);
        
        //everything was OK, return HTTP OK status (200) to the client
        response = new ResponseEntity<String>(HttpStatus.CREATED);
        return response;
    }
}