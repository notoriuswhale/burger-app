import React from "react";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import styles from "./Layout.module.css"
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
    state = {
        isSideDrawerVisible: false
    }

    sideDrawerToogleHandler = () => {
        this.setState((state) => {
            return {
                isSideDrawerVisible: !state.isSideDrawerVisible
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar clicked={this.sideDrawerToogleHandler}/>
                <SideDrawer show={this.state.isSideDrawerVisible} clicked={this.sideDrawerToogleHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>

            </React.Fragment>
        );
    }
}

export default Layout
