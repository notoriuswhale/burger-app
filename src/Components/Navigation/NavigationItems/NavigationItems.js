import React from "react";
import styles from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
    const authLinks = (
        <React.Fragment>
            <NavigationItem link={'/signin'} exact>Sign In</NavigationItem>
            <NavigationItem link={'/signup'} exact>Sign Up</NavigationItem>
        </React.Fragment>
    );

    return (
        <ul className={styles.Navigation}>
            <NavigationItem link={'/'} exact>Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link={'/orders'} >Orders</NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem link={'/logout'} >Logout</NavigationItem> : authLinks}
        </ul>
    );
};

export default NavigationItems;