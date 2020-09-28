import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  state = {
    ingredient: null
  }



  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
        </Layout>

      </div>
    );
  }
}

export default App;
