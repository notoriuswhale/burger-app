import React, {Component} from "react";

import styles from "./Orders.module.css"
import Order from "../../Components/Order/Order";
import Spiner from "../../Components/UI/Spiner/Spiner";
import axiosInst from "../../API/FirebaseDatabase";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";

class Orders extends  Component{

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = null;

        if(!this.props.loading && !this.props.error){
            let ordersArr = [];
            for(let order in this.props.orders){
                ordersArr.push(<Order key={order}
                                      ingredients={this.props.orders[order].ingredients}
                                      price={this.props.orders[order].price} />);
            }
            ordersArr.reverse();
            orders = ordersArr;
        }

        if(this.props.loading) orders = <Spiner />;
        if(this.props.error) orders = <p>Can't Load Orders!</p>;

        return (
            <div className={styles.Orders}>
                {orders.length > 0 ? orders : <p>You haven't ordered anything yet</p>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        error: state.orders.error,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInst));