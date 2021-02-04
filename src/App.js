import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';


class App extends Component {
  state = {
    ingredient: null
  }

  componentDidMount(){
    this.props.onRenewPage();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
              <Route path="/logout" component={Logout} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          </Layout>

        </div>
        
      </BrowserRouter>
      
    );
  }
}

const mapDispatchToProps = (dispatched) => {
  return {
    onRenewPage: () => dispatched(actions.authCheckStatus())

  };
};

export default connect(null, mapDispatchToProps)(App);
