export function PostData(type, userData) {
    let BaseURL = 'http://localhost:8080/myapp/';

    return new Promise((response, error) =>{
    
         
        fetch(BaseURL, {
          method: 'POST',
          headers: {
              'Accept':       'application/json',
              'Content-Type': 'application/json',
          },
          body: userData
      }).then(
        response => this.handleServerResponse(response),
        error => this.handleServerError(error)
      ).catch(error => this.handleServerError(error));

  
      });
}