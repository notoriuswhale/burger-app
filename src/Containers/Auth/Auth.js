import React, {Component} from "react";
import styles from "./Auth.module.css";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import * as actions from '../../store/actions/index'
import {connect} from "react-redux";
import Spiner from "../../Components/UI/Spiner/Spiner";
import {NavLink, Redirect} from "react-router-dom";

class Auth extends Component {
    state = {
        formControls: {
            login: {
                inputType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Login'
                },
                value: '',
                label: '',
                validation: {
                    isRequired: true
                },
                valid: false,
                touched: false,
            },
            password: {
                inputType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                label: '',
                validation: {
                    isRequired: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            },
        },
    }

    componentDidMount() {
        if (this.props.isPurchasing) {
            this.props.setAuthRedirect('/checkout')
        }
    }

    componentWillUnmount() {
        if (!this.props.isAuthenticated && this.props.isPurchasing) this.props.purchaseClose();
        this.props.setAuthRedirect('/')
    }

    inputValidate = (value, rules) => {
        let valid = true;
        if (!rules) return true;
        if (rules.isRequired) valid = value.trim() !== '' && valid;
        if (rules.minLength) valid = value.length >= rules.minLength && valid;
        if (rules.maxLength) valid = value.length <= rules.maxLength && valid;
        return valid;
    }

    changeInputHandler = (e, id) => {
        const updatedControls = {
            ...this.state.formControls,
            [id]: {
                ...this.state.formControls[id],
                value: e.target.value,
                touched: true,
                valid: this.inputValidate(e.target.value, this.state.formControls[id].validation),
            }
        };
        this.setState({formControls: updatedControls});
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.auth(this.state.formControls.login.value, this.state.formControls.password.value, this.props.signUp);
    }

    render() {
        let inputsConfig = [];
        for (let key in this.state.formControls) {
            inputsConfig.push({
                id: key,
                config: this.state.formControls[key],
            })
        }
        let form = <Spiner/>;
        let errorMessage = null;
        let redirect = this.props.isAuthenticated ? <Redirect to={this.props.authRedirect}/> : null;
        if (this.props.error) errorMessage = <p>{this.props.error.message}</p>
        if (!this.props.loading) {
            form = (
                <form onSubmit={this.submitHandler}>
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
                    <Button btnType={'Success'}>{this.props.signUp ? 'SIGN UP' : 'SIGN IN'}</Button>
                </form>);
        }

        return (
            <div className={styles.Auth}>
                {redirect}
                {errorMessage}
                {form}
                {!this.props.signUp ? <NavLink to={'/signup'}>Don't have an account? Sign up</NavLink>
                    : <NavLink to={'/signin'}>Have an account? Sign in</NavLink>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isPurchasing: state.orders.purchasing,
        authRedirect: state.auth.authRedirect,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (login, password, type) => dispatch(actions.auth(login, password, type)),
        purchaseClose: () => dispatch(actions.purchaseFinish()),
        setAuthRedirect: (link) => dispatch(actions.setAuthRedirect(link))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);