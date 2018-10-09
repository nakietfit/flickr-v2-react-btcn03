import React, { Component } from "react";
import { withRouter } from 'react-router'
import './Header.css'
import {showMenus} from './../../utils/menus'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tag: ''
        }
    }

    handleInput = e => {
        const {target} = e
        this.setState({
            tag: target.value
        })
    }  

    submitHandler = () => {
        this.props.history.push(`/tag/${this.state.tag}`)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <a className="navbar-brand">
                    flickr
                </a>

                <ul className="navbar-nav">
                    {showMenus()}
                </ul>
                <form className="form-inline" onSubmit={() => this.submitHandler()}>
                    <input 
                        className="form-control mr-sm-2" 
                        type="text" 
                        placeholder="Search" 
                        value={this.state.tag}
                        onChange={e => this.handleInput(e)}
                    />
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>
            </nav>
        );
    }
}

export default withRouter(Header);
