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
        this.props.fetchOrders();
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
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        error: state.orders.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInst));