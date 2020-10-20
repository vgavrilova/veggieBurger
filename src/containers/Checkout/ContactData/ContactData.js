import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import style from './ContactData.module.css';
import axios from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                street: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                houseNr: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'House Nr'
                    },
                    value: ''
                },
                city: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'City'
                    },
                    value: ''
                },
                country: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                zipCode: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: ''
                },
                email: {
                    inputType: 'input',
                    inputConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    inputType: 'select',
                    inputConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest Delivery'},
                            {value: 'standard', displayValue: 'Standard Delivery'}
                        ]
                    },
                    value: ''
                }
        },
        isLoading: false
            
    }

    orderHandler = (event) => {
        event.preventDefault();

        const contactData = {};
        
        for(let formId in this.state.orderForm){
            contactData[formId] = this.state.orderForm[formId].value;
        }
        
        this.setState({isLoading: true});
        const order = {
            contactData: contactData,
            ingredients: this.props.ingredients,
            total: this.props.total
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({isLoading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                //console.log(err);
                this.setState({isLoading: false});
            });
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
        form[identifier] = formIds;
        this.setState({
            orderForm: form
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
                     />
        })

        let form = (
            <form onSubmit={this.orderHandler}>
                    {inputFields}
                    <Button btnType="Success">Order now</Button>
            </form>
        );
        if(this.state.isLoading) {
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

export default ContactData;