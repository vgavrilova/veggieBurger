import React from 'react';

import style from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const NavItems = (props) => (
    <ul className={style.NavItems}>
        <NavItem link="/" active>Burger Builder</NavItem>
        <NavItem link="/">Checkout</NavItem>
        
    </ul>
);


export default NavItems;