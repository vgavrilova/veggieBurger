import React, { Component } from 'react';
import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum';

import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
            tomato: 1,
            salad: 1,
            cheese: 1,
            vegBacon: 1,
            vegMeat: 1
        },
        total: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        // for(let param of query.entries()){
        //     // gives a string ['cheese', '1'] --> param[0] and param[1]
        //     ingredients[param[0]] = +[param[1]];
        // }
        let total = 0;

        for(let [key, value] of query.entries()){
            if(key === 'total'){
                total = value;
            } else {
                ingredients[key] = Number(value);
            }
            
        }

        this.setState({ingredients: ingredients, total: total});
    }

    checkoutCancelled = () => {
        this.props.history.goBack();

    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){

        return(
            <div>
                <CheckoutSum 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={(props) => (<ContactData {...props} 
                    ingredients={this.state.ingredients}
                    total={this.state.total} />)} />
            </div>
        );
    }
}


export default Checkout;