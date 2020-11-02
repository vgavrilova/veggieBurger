import React, { Component } from 'react';
import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

/*     componentDidMount() {
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
    } */

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
                    ingredients={this.props.ingredients} 
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    }
}


export default connect(mapStateToProps)(Checkout);