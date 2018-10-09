import React from "react";
import {Route, Link} from 'react-router-dom'

const menus = [
    {
        name: 'Explore',
        to: '/',
        exact: true
    },
    {
        name: 'Create',
        to: '/create',
        exact: false
    },
    {
        name: 'Get Pro',
        to: '/get-pro',
        exact: false
    }
]

const MenuLink = ({label, to, activeOnlyWhenExact}) => {
    return (
        <Route 
            path={to}
            exact={activeOnlyWhenExact}
            children={({match}) => {
                var active = match ? 'active' : ''
                return (
                    <li className={`nav-item ${active}`}>
                        <Link 
                            to={to} 
                            className="nav-link"
                        >
                            {label}
                        </Link>
                    </li>
                )
            }}
        />
    )
}

export const showMenus = () => {
    var result = null
    if (menus.length > 0) {
        result = menus.map((menu, index) => {
            return (
                <MenuLink 
                    key={index}
                    label={menu.name}
                    to={menu.to}
                    activeOnlyWhenExact={menu.exact}
                />
            )
        })
    }
    return result
}