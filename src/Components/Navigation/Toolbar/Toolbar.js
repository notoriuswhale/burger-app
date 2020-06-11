import React from "react";
import styles from "./Toolbar.module.css"
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToogle from "../SideDrawer/DrawerToogle/DrawerToogle";

const Toolbar = (props) => {
    return (
        <header className={styles.Toolbar}>
            <DrawerToogle clicked={props.clicked} />
            <div className={styles.Logo}>
                <Logo/>
            </div>
            <nav className={styles.DesctopOnly}>
                <NavigationItems isAuthenticated={props.isAuthenticated}/>
            </nav>
        </header>
    );
};

export default Toolbar;