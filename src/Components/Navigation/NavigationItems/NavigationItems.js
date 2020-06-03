import React from "react";
import styles from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
    return (
        <ul className={styles.Navigation}>
            <NavigationItem link={'/'} exact>Burger Builder</NavigationItem>
            <NavigationItem link={'/checkout'} >Checkout</NavigationItem>
            <NavigationItem link={'/orders'} >Orders</NavigationItem>
        </ul>
    );
};

export default NavigationItems;