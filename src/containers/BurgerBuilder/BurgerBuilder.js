import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSum from '../../components/Burger/OrderSum/OrderSum';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    vegBacon: 1.3,
    vegMeat: 2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            
            salad: 0,
            vegBacon: 0,
            cheese: 0,
            vegMeat: 0
            
        },
        total: 5,
        purchaseable: false,
        orderMode: false
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

            console.log(sum); 

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
        alert('Continue!');
    }

    
    render(){

        const disableInfo = {
            ...this.state.ingredients
        };
        // create a new array of booleans with the ingredients
        // that checks whether an ingredient is less than 0
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0; // => returns true or false
        }
        // {salad:  true, cheese: false ...}


        return(

            <Aux>
                <Modal show={this.state.orderMode} clickedBackdrop={this.stopPurchaseHandler}>
                    <OrderSum 
                        continue={this.continuePurchaseHandler}
                        cancel={this.stopPurchaseHandler}
                        price={this.state.total}
                        ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                
                <div>
                    <BuildControls 
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.total}
                        purchaseable={this.state.purchaseable}
                        btnClicked={this.purchaseHandler}/>
                </div>
                
            </Aux>
        );
    }

}


export default BurgerBuilder;