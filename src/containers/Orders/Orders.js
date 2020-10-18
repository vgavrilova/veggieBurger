import React, { Component } from 'react';

import Order from '../../components/Order/Order/Order';
import axios from '../../axiosOrders';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(res => {
                // make an array of objects from the fetched data
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({ 
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            });
    }
    render (){
        return(
            <div>
                {this.state.orders.map(order => {
                     return <Order 
                            key={order.id} 
                            ingredients={order.ingredients} 
                            total={+order.total}/>
                })}

            </div>
        );
    }
}


export default Orders;