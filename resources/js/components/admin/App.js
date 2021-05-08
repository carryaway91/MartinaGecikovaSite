import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, withRouter, HashRouter } from 'react-router-dom'

import Layout from './HOC/Layout'
import Dashboard from './containers/Dashboard'
import CreatePainting from './containers/CreatePainting'
import About from './containers/About'
import CreateGallery from './containers/CreateGallery';
import ShowGallery from './containers/ShowGallery';
import ShowPortrait from './containers/ShowPortrait';
import ShowMessages from './containers/ShowMessages'

const App = (props) => {
    
    return (
        <div>
            <BrowserRouter>
                <Layout>
                    <section>
                        <Switch>
                            <Route path="/admin/about" exact render={() => <About meta="About info"/>} />
                            <Route path="/admin/add-painting" exact render={ () => <CreatePainting meta="Add new painting" /> } />
                            <Route path="/admin/add-gallery" exact render={ () => <CreateGallery meta="Add new gallery" /> } />
                            <Route path="/admin" exact render={ () => <Dashboard meta="Dashboard" />} />
                            <Route path="/admin/gallery/:id" exact render={() => <ShowGallery meta="Gallery details"/>} />
                            <Route path="/admin/photo/:id" exact render={ () => <ShowPortrait meta="Painting details" />} />
                            <Route path="/admin/messages" exact render={ () => <ShowMessages meta="Messages" />} />
                        </Switch>
                    </section>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;

if (document.getElementById('admin')) {
    ReactDOM.render(<App />, document.getElementById('admin'));
}
