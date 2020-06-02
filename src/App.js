import React from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuider/BurgerBuilder";

function App() {
  return (
      <Layout>
        <BurgerBuilder />

      </Layout>
  );
}


export default App;
