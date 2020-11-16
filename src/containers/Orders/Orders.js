import React, { Component } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order/Order';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {

    componentDidMount(){
        this.props.fetchOrdersHandler();

    }
    render (){
        const orders = this.props.isLoading ? <Spinner /> :
            this.props.orders.map(order => {
                return <Order 
                    key={order.id} 
                    ingredients={order.ingredients} 
                    total={+order.total}/>
        });
        return(
            <div>
                {orders}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        isLoading: state.order.loading
    };
};

const mapDispatchToProps = (dispatched) => {
    return {
        fetchOrdersHandler: () => dispatched(actions.fetchOrdersAction())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Orders);