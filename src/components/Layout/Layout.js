import React from 'react';

import Aux from '../../hoc/Aux';
import style from './Layout.module.css';

// will be seen on every page
// kind of a wrapper
const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={style.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;