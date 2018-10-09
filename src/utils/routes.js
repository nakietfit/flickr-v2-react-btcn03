import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Photo from './../components/Photo/Photo'
import Explore from './../components/Explore/Explore'
import TagSearch from './../components/TagSearch/TagSearch'
import EmptyPage from './../components/EmptyPage/EmptyPage'
import NotFoundPage from './../components/NotFoundPage/NotFoundPage'

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Explore />
    },
    {
        path: '/tag/:tag_search',
        exact: false,
        main: () => <TagSearch />
    },
    {
        path: '/photo/:photo_id',
        exact: false,
        main: () => <Photo />
    },
    {
        path: '/create',
        exact: false,
        main: () => <EmptyPage />
    },
    {
        path: '/get-pro',
        exact: false,
        main: () => <EmptyPage />
    },
    {
        path: '*',
        exact: true,
        main: () => <NotFoundPage />
    }
]

export const showContentMenus = () => {
    var result = null
    if (routes.length > 0) {
        result = routes.map((route, index) => {
            return (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main} 
                />
            )
        })
    }
    return <Switch>{result}</Switch>
}