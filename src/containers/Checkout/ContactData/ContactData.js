import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import style from './ContactData.module.css';
import axios from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as actionTypes from '../../../store/actions';

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                houseNr: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'House Nr'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                city: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'City'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        mail: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    inputType: 'select',
                    inputConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest Delivery'},
                            {value: 'standard', displayValue: 'Standard Delivery'}
                        ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                }
        },
        formIsValid: false
            
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = (value.length >= rules.minLength) && isValid;
        }
        if(rules.mail){
            isValid = value.includes('@') && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const contactData = {};
        
        for(let formId in this.state.orderForm){
            contactData[formId] = this.state.orderForm[formId].value;
        }
        
        const order = {
            contactData: contactData,
            ingredients: this.props.ingredients,
            total: this.props.total
        }

        this.props.onOrderHandler(order);

    }

    onChangeHandler = (e, identifier) => {
        
        // we need to change objects, otherwise we're creating only pointers to them
        //console.log(e.target.value);
        const form = {
            ...this.state.orderForm
        };
        const formIds = {
            ...form[identifier]
        };
        formIds.value = e.target.value;
        formIds.touched = true;
        formIds.valid = this.checkValidity(formIds.value, formIds.validation);

        form[identifier] = formIds;


        let formIsValid = true;
        // set formIsValid to true
        // only if the previous AND the current element is true
        for(let identifier in form){
            formIsValid = form[identifier].valid && formIsValid;
        }
        
        //console.log(formIds.valid);
        this.setState({
            orderForm: form,
            formIsValid: formIsValid
        });
    }

    render () {
        const formArr = [];
        for (let key in this.state.orderForm){
            formArr.push({
                config: this.state.orderForm[key],
                id: key
            })
        }

        const inputFields = formArr.map(field => {
            return <Input 
                    inputType={field.config.inputType} 
                    inputConfig={field.config.inputConfig} 
                    value={field.config.value} 
                    key={field.id}
                    changed={(e) => this.onChangeHandler(e, field.id)}
                    invalid={!field.config.valid }
                    touched={field.config.touched}
                    shouldValidate={field.config.validation}
                    valueType={field.id}
                     />
        })

        let form = (
            <form onSubmit={this.orderHandler}>
                    {inputFields}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>Order now</Button>
            </form>
        );
        if(this.props.isLoading) {
            form = <Spinner />;
        }

        return(
            <div className={style.ContactData}>
                <h4>Enter your Contact Data:</h4>
                {form}

            </div>
            
            
        );
    }


}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        total: state.burgerBuilder.total,
        isLoading: state.order.loading
    };
};

const mapDispatchToProps = (dispatched) => {
    return {
        onOrderHandler: (orderData) => dispatched(actionTypes.burgerPurchaseAction(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));