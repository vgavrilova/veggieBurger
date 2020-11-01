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
import * as actionTypes from '../../store/actions';


const INGREDIENT_PRICES = {
    tomato: 0.45,
    salad: 0.5,
    cheese: 0.8,
    vegBacon: 1.3,
    vegMeat: 2
}

class BurgerBuilder extends Component {
    state = {
        total: 5,
        purchaseable: false,
        orderMode: false,
        isLoading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        // get the ingredients data from the backend
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(err => {
        //         this.setState({error: true});
        //     });
    }

    updatePurchase = (prevState) => {
        const ingredients = {
            ...prevState
        };

        // customize an array of keys as an array of the values
        // summarize the values with reduce() method
        const sum = Object.keys(ingredients).map(el => {
            return ingredients[el]
            })
            .reduce((prevEl, currentEl) => {
                return prevEl + currentEl}, 0);

            //console.log(sum); 

           this.setState({purchaseable: sum > 0});
            
    }
       

    addIngredientHandler = (type) => {
        // increment an ingredient of selected type
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        // save the updated count to the oblect ingredients
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        // sum total price with the price of an added element
        const newPrice = this.state.total + priceAddition;
        // update the state
        this.setState({total: newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // prevent removing when havin null items
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const priceDiscount = INGREDIENT_PRICES[type];
        const newPrice = this.state.total - priceDiscount;
        this.setState({total: newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({orderMode: true});
    }

    stopPurchaseHandler = () => {
        this.setState({orderMode: false});
    }

    continuePurchaseHandler = () => {

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('total=' + encodeURIComponent(this.state.total));
        const queryString = queryParams.join('&');

        this.props.history.push(`/checkout?${queryString}`);

        
    }

    
    render(){

        const disableInfo = {
            ...this.props.ingredients
        };
        // create a new array of booleans with the ingredients
        // that checks whether an ingredient is less than 0
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0; // => returns true or false
        }
        // {salad:  true, cheese: false ...}
        let orderSum = null;


        // show loading spinner in case the post request is being sent
        if(this.state.isLoading){
            orderSum = <Spinner />;
        }

        // show the spinner if there are no ingredients in the backend
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p>
                     : <Spinner />;

        if(this.props.ingredients){
            burger = (
            <Aux>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                    addIngredient={this.props.onAddIngredientHandler}
                    removeIngredient={this.props.onRemoveIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.total}
                    purchaseable={this.state.purchaseable}
                    btnClicked={this.purchaseHandler}/>
            </Aux>
            );

            orderSum = <OrderSum 
                        continue={this.continuePurchaseHandler}
                        cancel={this.stopPurchaseHandler}
                        price={this.state.total}
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
        ingredients: state.ingredients,
        total: state.total
    };
}

const mapDispatchToProps = (dispatched) => {
    return {
        onAddIngredientHandler: (ingName) => dispatched({type: actionTypes.addIngredient, ingredientName: ingName}),
        onRemoveIngredientHandler: (ingName) => dispatched({type: actionTypes.removeIngredient, ingredientName: ingName})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));