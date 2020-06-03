import React from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuider/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";
import {Route, Switch} from "react-router-dom";
import Orders from "./Containers/Orders/Orders";

function App() {
  return (
      <Layout>
          <Switch>
              <Route path='/' exact render={(props) => <BurgerBuilder {...props} />} />
              <Route path='/checkout' component={Checkout} />
              <Route path='/orders' component={Orders} />
          </Switch>
      </Layout>
  );
}


export default App;
