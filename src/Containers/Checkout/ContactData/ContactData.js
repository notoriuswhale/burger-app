import React, {Component} from "react";

import styles from "./ContactData.module.css";
import Button from "../../../Components/UI/Button/Button";
import Input from "../../../Components/UI/Input/Input";
import {connect} from "react-redux";
import * as actions from "../../../store/actions/index"

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                label: 'Enter Your Name',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false,
            },
            country: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                label: 'Country',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false,
            },
            city: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                label: 'Enter Your City',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false,
            },
            street: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                label: 'Enter Your Street',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                inputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'PostCode'
                },
                value: '',
                label: 'Enter Your PostCode',
                validation: {
                    isRequired: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            email: {
                inputType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                label: 'Enter Your E-mail',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                inputType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                },
                value: 'fastest',
                label: 'Select Delivery Method',
                validation: {},
                valid: true,
                touched: false,
            },
        },
        loading: false,
        formValid: false,
    }

    inputValidate = (value, rules) => {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    orderHandler = (e) => {
        e.preventDefault();

        let orderData = {};

        for (let i in this.state.orderForm) {
            orderData[i] = this.state.orderForm[i].value;
        }

        let order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData: orderData,
            userId: this.props.userId
        };
        this.props.submitOrder(order, this.props.token);


    }

    changeInputHandler = (e, id) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedElement = {...updatedOrderForm[id]};
        updatedElement.value = e.target.value;
        updatedOrderForm[id] = updatedElement;
        updatedElement.touched = true;
        updatedElement.valid = this.inputValidate(updatedElement.value, updatedElement.validation);

        let formValid = true;
        for(let i in updatedOrderForm){
            formValid = updatedOrderForm[i].valid && formValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formValid: formValid
        });
    }

    render() {
        let inputsConfig = [];
        for (let key in this.state.orderForm) {
            inputsConfig.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {inputsConfig.map(formElement => {
                    return <Input key={formElement.id}
                                  inputType={formElement.config.inputType}
                                  elementConfig={formElement.config.elementConfig}
                                  value={formElement.config.value}
                                  changed={(e) => this.changeInputHandler(e, formElement.id)}
                                  valid={formElement.config.valid}
                                  touched={formElement.config.touched}
                                  label={formElement.config.label}/>;
                })}
                <Button btnType={'Success'} disabled={!this.state.formValid}>ORDER</Button>
            </form>
        );
        return (
            <div className={styles.ContactData}>
                <h3>Enter your Contact Data</h3>
                {form}
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitOrder: (order, token) => dispatch(actions.submitOrder(order, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);