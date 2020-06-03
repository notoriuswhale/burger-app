import React, {Component} from "react";

import styles from "./Orders.module.css"
import Order from "../../Components/Order/Order";
import Spiner from "../../Components/UI/Spiner/Spiner";
import axiosInst from "../../API/FirebaseDatabase"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends  Component{
    state = {
        orders: null,
        loading: true,
        error:null
    }
    componentDidMount() {
        axiosInst.get('/orders.json')
            .then((resp => {
                console.log(resp);
                this.setState({
                    orders: resp.data,
                    loading: false
                })
            }))
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err
                })
            })
    }

    render() {
        let orders = null;
        if(this.state.error) orders = <p>Can't Load Ingredients!</p>;

        if(this.state.loading) orders = <Spiner />;

        if(!this.state.loading && !this.state.error){
            let ordersArr = [];
            for(let order in this.state.orders){
                ordersArr.push(<Order key={order}
                                      ingredients={this.state.orders[order].ingredients}
                                      price={this.state.orders[order].price} />);
            }
            ordersArr.reverse();
            orders = ordersArr;
        }

        return (
            <div className={styles.Orders}>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axiosInst);