import React from 'react';
import {
    HashRouter,
    Route,
    Switch
  } from 'react-router-dom';
import {Navigation} from "./navigation.jsx";
import {NotFound} from "./_notFound.jsx";
import {AddEvent} from "./_addEvent.jsx";
import {Events} from "./_browseEvents.jsx"
import {Home} from "./_home.jsx";

class Routing extends React.Component{

    render() {
        return <HashRouter>
            <div>
                <Navigation/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/event' component={AddEvent}/>
                    <Route path='/browse' component={Events}/>
                    <Route path='*' component={NotFound}/>
                </Switch>
            </div>
        </HashRouter>;
    }
}

export {Routing}
