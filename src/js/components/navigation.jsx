import React from 'react';
import {NavLink as Link} from 'react-router-dom';

class Navigation extends React.Component{
    render(){
        return <nav className={'page-navigation'}>
            <ul>
                {/*<li><Link exact to='/' activeClassName={'nav-active'}>Home</Link></li>*/}
                <li><Link to='/event'>Add new event</Link></li>
                <li><Link to='/test'>test</Link></li>
            </ul>
        </nav>
    }
}

export {Navigation}