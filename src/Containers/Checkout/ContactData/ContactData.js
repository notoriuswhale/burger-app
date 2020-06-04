import React, {Component} from "react";

import styles from "./ContactData.module.css";
import Button from "../../../Components/UI/Button/Button";
import axiosInst from "../../../API/FirebaseDatabase"
import Spiner from "../../../Components/UI/Spiner/Spiner";
import Input from "../../../Components/UI/Input/Input";

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
        let valid = true;
        if(!rules) return true;
        if (rules.isRequired) valid = value.trim() !== '' && valid;
        if (rules.minLength) valid = value.length >= rules.minLength && valid;
        if (rules.maxLength) valid = value.length <= rules.maxLength && valid;

        return valid;
    }

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true});
        let orderData = {};

        for (let i in this.state.orderForm) {
            orderData[i] = this.state.orderForm[i].value;
        }

        let order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            orderData: orderData,
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
        if (this.state.loading) form = <Spiner/>;
        return (
            <div className={styles.ContactData}>
                <h3>Enter your Contact Data</h3>
                {form}
            </div>)
    }
}

export default ContactData;