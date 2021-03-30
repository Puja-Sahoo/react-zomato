import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './Home';
import Filter from './Filter';
import Details from './Details';
import App from '../App';
import Header from './Header';

const Router = () => {
    return (
        <BrowserRouter>
        <Header/>
            <Route exact path="/" component={Home} />
            <Route path="/filter" component={Filter} />
            {//exact keyword for exact search result used with subsets
            }
            <Route path="/details" component={Details} />
            <Route path="/app" component={App} />
        </BrowserRouter>
    )
}

export default Router;