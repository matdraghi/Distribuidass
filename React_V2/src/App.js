import React, {Component} from 'react';
import AppHeader from './components/layout/AppHeader';
import Home from './components/Home'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ConsultarReclamos from './components/ConsultarReclamos';
import Login from './components/Login';
import Reclamos from './components/Reclamos';
import Registro from '../src/components/Registro'
import ReclamosEdificio from './components/ReclamosEdificio'
import SubirFotos from './components/SubirFoto'

class App extends Component {

    state = {
        isSessionActive: false,
        documento: ''
    }

    handleChildCerrarSesion = () => {
        this.setState({
            isSessionActive: false,
            documento: ''
        });
    }

    handleChildLogin = (documento) => {
        this.setState({
            isSessionActive: true,
            documento: documento, 
            Nombre: ''
        })
    }


    render() {
        return (
            <Router>
                <div className="App">
                    <AppHeader documento={this.state.documento} isSessionActive={this.state.isSessionActive}
                               appCerrarSesion={this.handleChildCerrarSesion}/>
                   
                   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
      
      <br/>
      <div className="container">
          <div className="row">
              <div className="col-lg-12">
                  
                  <Route exact path='/' component={Registro}/>
                  <Route exact path='/home' component={Home}/>

                  <Route exact path='/login' render={() => <Login appLogin={this.handleChildLogin}/>}/>
                  <Route exact path='/reclamos' render={() => <Reclamos documento={this.state.documento}/>}/>
                  
                  <Route exact path='/reclamoEdificio'render={() => <ReclamosEdificio documento={this.state.documento}/>}/>
                  <Route exact path='/Consultar' render={() => <ConsultarReclamos documento={this.state.documento}/>}/>
                  
                  <Route exact path='/SubirFotos' render={() => <SubirFotos documento={this.state.documento}/>}/>
                  <Route exact path='/registro' render={() => <Registro appRegistro={this.handleChildLogin}/>}/>
              </div>
              
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
