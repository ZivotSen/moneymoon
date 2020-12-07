import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Error from "../../pages/Error/Error";
import Home from "../Home/Home";
import Register from "../Register/Register";

class App extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/home" component={ Home } />
                    <Route exact path="/register" component={ Register } />
                    <Route component={ Error } />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
