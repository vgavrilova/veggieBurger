import React from 'react';

import style from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import OpenBar from '../SideDrawer/OpenBar';


const toolbar = (props) => (
    <header className={style.Toolbar}>
        <OpenBar />
        <Logo height="82%" />
        <nav className={style.DesktopOnly}>
            <NavItems isLoggedIn={props.isLoggedIn}/>
        </nav>
    </header>
);


export default toolbar;