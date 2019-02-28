import React, { Component } from 'react';
import ActionForm from './ActionForm';

class Action extends Component {

    handleSubmit = values => {
        console.log(values);
    }

    render() {
        return (
            <ActionForm onSubmit={this.handleSubmit} type={this.props.type} />
        );
    }
}

export default Action;