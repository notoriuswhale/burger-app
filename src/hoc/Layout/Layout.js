import React from "react";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import styles from "./Layout.module.css"
import SideDrawer from "../../Components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

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
                <Toolbar clicked={this.sideDrawerToogleHandler} isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer show={this.state.isSideDrawerVisible}
                            clicked={this.sideDrawerToogleHandler}
                            isAuthenticated={this.props.isAuthenticated}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>

            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null,
    };
}
export default connect(mapStateToProps)(Layout);
