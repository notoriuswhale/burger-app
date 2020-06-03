import React, {Component} from "react";

import styles from "./ContactData.module.css";
import Button from "../../../Components/UI/Button/Button";
import axiosInst from "../../../API/FirebaseDatabase"
import Spiner from "../../../Components/UI/Spiner/Spiner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        postalCode: '',
        loading: false,
    }
    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true});

        let order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            customer: {
                name: 'Vitaliy',
                address: {
                    street: 'some street 8',
                    zipCode: '482226',
                    country: 'Ukraine',
                },
                email: 'example@example.com',
            }
        };

        axiosInst.post('/orders.json', order)
            .then(resp => {
                this.setState({loading: false});
                this.props.history.push('/')
            })
            .catch((error => {
                this.setState({loading: false, purchasing: false,});
                console.log('hi');
            }));
    }

    render() {
        let form = (
            <form onSubmit={this.orderHandler}>
                <input type="text" className={styles.Input} name={'name'} placeholder='Your Name'/>
                <input type="text" className={styles.Input} name={'email'} placeholder='Your E-Mail'/>
                <input type="text" className={styles.Input} name={'address'} placeholder='Your Address'/>
                <input type="text" className={styles.Input} name={'postal'} placeholder='Your Postal Code'/>
                <Button btnType={'Success'}>ORDER</Button>
            </form>
        );
        if (this.state.loading) form = <Spiner/>;
        return (
            <div className={styles.ContactData}>
                <h3>Enter your Contact Data</h3>
                {form}
            </div>)
    }
}

export default ContactData;