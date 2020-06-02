import React from "react";
import logo from "../../assets/images/burgerlogo.png"
import styles from "./Logo.module.css"

const Logo = ({height, ...props}) => {
    return (
        <div className={styles.Logo} style={{
            height: height
        }}>
            <img src={logo} alt="MyBurgerLogo"/>
        </div>
    );
}

export default Logo;