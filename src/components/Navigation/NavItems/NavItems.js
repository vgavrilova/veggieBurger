import React from 'react';

import style from './NavItems.module.css';
import NavItem from './NavItem/NavItem';


const NavItems = (props) => (

    <ul className={style.NavItems}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        <NavItem link="/orders">Orders</NavItem>
        {
            !props.isLoggedIn ? <NavItem link="/auth">Login</NavItem>
            : <NavItem link="/logout">Logout</NavItem>
        }
        
        
        
    </ul>
);


export default NavItems;