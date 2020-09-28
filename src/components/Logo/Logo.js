import React from 'react';
import Logo from '../../../src/assets/images/burger-logo.png';

import style from './Logo.module.css';

const logo = (props) => (
    <div className={style.Logo} style={{height: props.height}}>
        <img src={Logo} alt="BurgerLogo" />
    </div>
);


export default logo;