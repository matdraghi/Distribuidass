import React, {Component, useState} from 'react'
import {Button, FormLabel, Alert} from 'react-bootstrap';
import {withRouter, Link} from 'react-router-dom';


class SubirFotos extends Component {
        
    state = {
        uri: ""
    }
      onChange(e) {
    
        
        var input = document.querySelector('input[type="file"]')

        var data = new FormData()
        data.append('file', input.files[0])
        data.append('user', 'hubot')
        
        fetch('http://localhost:8080/myapp/savefile', {
          method: 'POST',
          body: data
        }).then((response) => response.json()).then((json) => {
            this.setState({
                uri : json,
              });
        })
         
    
      }

      handleUploadImage = () => {
        alert("Your file is being uploaded!");
        
    }

render (){
        return (
            
          <div>
    
            <h1>File Upload</h1>
            <input type="file" onChange={(e) => this.onChange(e)}   />
            
            <Button variant="primary" onClick={this.handleUploadImage}>
           
           
                 Upload File!
            </Button>
        </div>
        );
      }
}

export default withRouter(SubirFotos)