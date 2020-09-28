import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import style from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import ShowSideBar from '../../context/ShowSideBar';

// will be seen on every page
// kind of a wrapper
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true});
    }

    render () {

        return(
        <Aux>
            <ShowSideBar.Provider value={{show: this.sideDrawerOpenedHandler}}>
                <Toolbar openSideBar={this.sideDrawerOpenedHandler}/>
            </ShowSideBar.Provider>    
            <SideDrawer 
                show={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler}/>
            <main className={style.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
} 

export default Layout;