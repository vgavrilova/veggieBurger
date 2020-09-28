import React from 'react';

import style from './OpenBar.module.css';
import ShowSideBar from '../../../context/ShowSideBar';


const openBar = (props) => (
    <ShowSideBar.Consumer>
    { (context) =>     
        <div 
            className={style.Menu}
            onClick={context.show}>
            <i className="fas fa-bars"></i>
        </div>}
    </ShowSideBar.Consumer>
);


export default openBar;