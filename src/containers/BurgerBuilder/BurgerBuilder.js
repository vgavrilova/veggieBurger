import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSum from '../../components/Burger/OrderSum/OrderSum';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as burgerActions from '../../store/actions';



class BurgerBuilder extends Component {
    state = {
        orderMode: false
    }

    componentDidMount () {
        console.log(this.props);
        // get the ingredients data from the backend
        this.props.onInitIngredientsHandler();

    }

    updatePurchase = (ingredients) => {

        // customize an array of keys as an array of the values
        // summarize the values with reduce() method
        const sum = Object.keys(ingredients).map(el => {
            return ingredients[el]
            })
            .reduce((prevEl, currentEl) => {
                return prevEl + currentEl}, 0);

            //console.log(sum); 

           return sum > 0;
            
    }
       

    purchaseHandler = () => {
        this.setState({orderMode: true});
    }

    stopPurchaseHandler = () => {
        this.setState({orderMode: false});
    }
/* 
    continuePurchaseHandler = () => {

        const queryParams = [];
        for(let i in this.props.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        }
        queryParams.push('total=' + encodeURIComponent(this.props.total));
        const queryString = queryParams.join('&');

        this.props.history.push(`/checkout?${queryString}`);

        
    } */

    continuePurchaseHandler = () => {
        this.props.history.push('/checkout');
    }

    
    render(){

        const disableInfo = {
            ...this.props.ingredients
        };
        // create a new array of booleans with the ingredients
        // that checks whether an ingredient is less or equal to 0
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0; // => returns true or false
        }
        // {salad:  true, cheese: false ...}
        let orderSum = null;


        // show the spinner if there are no ingredients in the backend
        let burger = this.props.error ? 
                    <p style={{textAlign: 'center', marginTop: '7rem'}}>
                    Ingredients can't be loaded</p>
                     : <Spinner />;

        if(this.props.ingredients){
            burger = (
            <Aux>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                    addIngredient={this.props.onAddIngredientHandler}
                    removeIngredient={this.props.onRemoveIngredientHandler}
                    disabled={disableInfo}
                    price={this.props.total}
                    purchaseable={this.updatePurchase(this.props.ingredients)}
                    btnClicked={this.purchaseHandler}/>
            </Aux>
            );

            orderSum = <OrderSum 
                        continue={this.continuePurchaseHandler}
                        cancel={this.stopPurchaseHandler}
                        price={this.props.total}
                        ingredients={this.props.ingredients}/>;
        }

        return(

            <Aux>
                <Modal show={this.state.orderMode} clickedBackdrop={this.stopPurchaseHandler}>
                    {orderSum}
                </Modal>
                {burger}
                
            </Aux>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        total: state.burgerBuilder.total,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = (dispatched) => {
    return {
        onAddIngredientHandler: (ingName) => dispatched(burgerActions.addIngredientAction(ingName)),
        onRemoveIngredientHandler: (ingName) => dispatched(burgerActions.removeIngredientAction(ingName)),
        onInitIngredientsHandler: () => dispatched(burgerActions.initIngredientsAction())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));