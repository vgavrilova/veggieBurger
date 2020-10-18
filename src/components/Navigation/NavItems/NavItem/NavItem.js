import React from 'react';

import style from './NavItem.module.css';
import { NavLink } from 'react-router-dom';


const navItem = (props) => (
    <li className={style.NavItem}>
        <NavLink 
            exact={props.exact}
            to={props.link} 
            activeClassName={style.active}>{props.children}</NavLink>
    </li>

);


export default navItem;