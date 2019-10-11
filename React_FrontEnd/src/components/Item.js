import React, { Component } from 'react'

export class Item extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.producto}</td>
                <td>{this.props.cantidad}</td>
            </tr>
        )
    }
}

export default Item
