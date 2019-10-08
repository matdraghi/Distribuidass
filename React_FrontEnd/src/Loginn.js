import React, {Component} from "react";
import { Container } from "shards-react";
import LoginInterno from "./LoginInterno";

class Login extends Component {
  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <div className="error">
          <div className="error__content">
            <h3>Bienvenido al mayorista UADE</h3>
          <LoginInterno/>
          </div>
        </div>
      </Container>
    );

  }
}

export default Login;