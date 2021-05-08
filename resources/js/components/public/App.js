import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {NavLink, BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'

import Layout from './HOC/Layout/Layout'
import About from './Containers/About/About'
import Gallery from './Containers/Gallery/Gallery'
import Images from './Containers/Gallery/Images/Images'
import Home from './Containers/Home/Home'
import Contact from './Containers/Contact/Contact'


const App = (props) => {
    
    return (
        <BrowserRouter>
            <Layout> 
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                    <Route path="/gallery" exact render={ () => <Gallery /> } />
                    <Route path="/gallery/:id/:imageID?" exact render={ () => <Images />} />
                    <Route path="/contact" exact component={Contact} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;


if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
