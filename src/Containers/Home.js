import React, { Component } from 'react';

import logo from './../logo.svg';
import { Button } from '../Components/Button';


export default class Home extends Component {

    render() {

        return(
            <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                   IO SONO LA APP
                </p>
                <Button
                    onClick={()=> console.log('PRESSED A BUTTON')}
                    buttonName={'PRESS ME'}
                />
            </div>
        )
    }
}