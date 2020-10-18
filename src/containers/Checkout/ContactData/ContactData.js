import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import style from './ContactData.module.css';
import axios from '../../../axiosOrders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        adress: {
                    street: '',
                    houseNr: '',
                    city: '',
                    country: '',
                    zipCode: ''
                },
        email: '',
        isLoading: false
            
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({isLoading: true});
        const order = {
            ingredients: this.props.ingredients,
            total: this.props.total,
            customer: {
                name: 'Val Gavrilova',
                adress: {
                    street: 'Zum Werhahn',
                    houseNr: '8',
                    city: 'Kerpen',
                    country: 'Germany',
                    zipCode: '50169'
                },
                email: 'gavrivalery@gmail.com'
            },
            deliveryMethod: 'fastest'
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

    render () {
        let form = (
            <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="text" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="zipCode" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order now</Button>
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