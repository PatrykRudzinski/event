import React from 'react';
import {NavLink as Link} from 'react-router-dom';

class Navigation extends React.Component{

    render(){

        return <nav className={'nav'}>
            <ul>
                <li><Link exact to='/' activeClassName={'nav-active'}>Strona Główna</Link></li>
                <li><Link to='/newevent' activeClassName={'nav-active'}>Dodaj nowe wydarzenie</Link></li>
            </ul>
        </nav>
    }
}

export {Navigation}