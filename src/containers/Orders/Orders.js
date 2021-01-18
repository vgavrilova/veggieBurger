import React, { Component } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order/Order';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';


class Orders extends Component {
    state = {
        openedModal: true
    }

    componentDidMount(){
        this.props.fetchOrdersHandler(this.props.authenticated);

    }

    closeModalHandler = () => {
        this.setState({openedModal: false});
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
                {this.props.authenticated != null ? orders : 
                <Modal show={this.state.openedModal} clickedBackdrop={this.closeModalHandler}>
                    <p style={{color: 'red', textAlign: 'center', padding: '5px'}}>You have to authenticate!</p>
                </Modal>}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        isLoading: state.order.loading,
        authenticated: state.auth.token
    };
};

const mapDispatchToProps = (dispatched) => {
    return {
        fetchOrdersHandler: (token) => dispatched(actions.fetchOrdersAction(token))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Orders);