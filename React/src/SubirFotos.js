import React, {Component} from 'react'
import {Button, Form } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'


class SubirFotos extends Component {



render () {

    return (    
            <Form className="col-lg-5 no-padding-left">
                <h2 className="mb-3">Upload Image Please!</h2>
                <Form.Group controlId="file">
                    <Form.Label>Select A File Please</Form.Label>
                    <Form.Control name="file" type-color = "red"  id="fileToUpload" type="file" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upload
                </Button>
            </Form>
        )
    }
}


export default withRouter(SubirFotos)