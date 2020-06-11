import React from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuider/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";
import {Redirect, Route, Switch} from "react-router-dom";
import Orders from "./Containers/Orders/Orders";
import Auth from "./Containers/Auth/Auth";
import {connect} from "react-redux";
import Logout from "./Containers/Logout/Logout";
import * as actions from "./store/actions/index"

class App extends React.Component {
    componentDidMount() {
        this.props.onTryAutoSighnIn();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/' exact render={(props) => <BurgerBuilder {...props} />}/>
                <Route path='/signin' render={props => <Auth signUp={false} {...props} />}/>
                <Route path='/signup' render={props => <Auth signUp={true} {...props} />}/>
                <Route path='/logout' component={Logout}/>
                <Redirect to={'/'}/>
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/' exact render={(props) => <BurgerBuilder {...props} />}/>
                    <Route path='/checkout' component={Checkout}/>
                    <Route path='/orders' component={Orders}/>
                    <Route path='/signin' render={props => <Auth signUp={false} {...props} />}/>
                    <Route path='/signup' render={props => <Auth signUp={true} {...props} />}/>
                    <Route path='/logout' component={Logout}/>
                    <Redirect to={'/'}/>
                </Switch>
            );
        }
        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSighnIn: () => dispatch(actions.authCheckState())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
