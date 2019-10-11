import React, {Component} from 'react'

export class Boolean extends Component {
    render() {
        const result = this.props.value ? "Sí" : "No";
        return (
            <span>{result}</span>
        )
    }
}

export default Boolean