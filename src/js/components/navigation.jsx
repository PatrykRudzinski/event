import React from 'react';
import {NavLink as Link} from 'react-router-dom';

class Navigation extends React.Component{
    render(){
        return <nav className={'nav'}>
            <ul>
                <li><Link exact to='/' activeClassName={'nav-active'}>Strona Główna</Link></li>
                <li><Link to='/event' activeClassName={'nav-active'}>Dodaj nowe wydarzenie</Link></li>
                <li><Link to='/browse' activeClassName={'nav-active'}>Przeglądaj wydarzenia</Link></li>
            </ul>
        </nav>
    }
}

export {Navigation}