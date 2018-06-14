import React from 'react';
import {
    HashRouter,
    Route,
    Switch
  } from 'react-router-dom';
import {Navigation} from "./navigation.jsx";
import {NotFound} from "./_notFound.jsx";
import {AddEvent} from "./_addEvent.jsx";
import {Events} from "./_browseEvents.jsx";

class Routing extends React.Component{

    render() {

        return <HashRouter>
            <div>
                <Navigation/>
                <Switch>
                    <Route exact path='/' component={Events}/>
                    <Route path='/newevent' component={AddEvent}/>
                    <Route path='*' component={NotFound}/>
                </Switch>
            </div>
        </HashRouter>;
    }
}

export {Routing}
