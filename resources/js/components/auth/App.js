import React from 'react'
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from './register/register'
import Login from './Login/Login'

const App = () => {

    return (
        <div>
           <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
           </BrowserRouter>
        </div>
    )
}

export default App;

if (document.getElementById('auth')) {
    ReactDOM.render(<App />, document.getElementById('auth'));
}
