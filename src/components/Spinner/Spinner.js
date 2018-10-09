// Src: https://gitlab.com/MohamedBahmed/google-loaders-redesign

import React, { Component } from "react";
import './Spinner.css'

class Spinner extends Component {
    render() {
        return (
            <div className="spinner">
                <div className="spinner-container" >
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
            </div>
        );
    }
}

export default Spinner;
