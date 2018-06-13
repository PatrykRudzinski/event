import React from 'react';
import {Form} from './form.jsx';

class AddEvent extends React.Component{
     render() {
         return <Form data={this.props.location.data}/>
    }
}

export {AddEvent}

