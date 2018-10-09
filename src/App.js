import React, { Component, Fragment } from 'react';
import {BrowserRouter} from 'react-router-dom'
import Header from './components/Header/Header'
import {showContentMenus} from './utils/routes'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Header />
                    {showContentMenus()}
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
