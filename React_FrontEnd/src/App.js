import React, {Component} from 'react';
import AppHeader from './AppHeader'
import Home from './Home'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Login from './Login';
import Reclamos from './Reclamos'
import ReclamosEdificio from './ReclamosEdificio'
import Registro from './Registro'
import ConsultarReclamos from './ConsultarReclamos'
import SubirFotos from './SubirFotos'
import {FileUploader} from './file-uploader.jsx';
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
            documento: documento
        })
    }

    handleChildRegistro = (documento) => {
        this.setState({
            isSessionActive: false,
            documento: documento
        })
    }

    render() {
      
     if (this.state.redirectToReferrer) {
      return (<Redirect to={'/reclamos'}/>)
    }
        return (
            <Router>
                <div className="App" background-color= '#1a50bd'>
                    <AppHeader documento={this.state.documento} isSessionActive={this.state.isSessionActive}
                               appCerrarSesion={this.handleChildCerrarSesion}/>
                
                 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
      
                    <br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/home' component={Home}/>
                                <Route exact path='/login' render={() => <Login appLogin={this.handleChildLogin}/>}/>
                                <Route exact path='/reclamos' component={Reclamos}/>
                                <Route exact path='/reclamoEdificio' component={ReclamosEdificio}/>
                                <Route exact path='/Consultar' component={ConsultarReclamos}/>
                                
                                <Route exact path='/SubirFotos' component={SubirFotos}/>
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
