import React from "react"
import { Link, useHistory } from "react-router-dom"

import FoodDelivery from "assets/delivery_home2.png"

import styles from "./style.scss"

const Home = () => {
  const history = useHistory()

  return (
    <div className={styles["home-container"]}>
      <img src={FoodDelivery} draggable="false" /> 
     <div className={styles.text}>
        <p className={styles.description}>
        Fast, efficient and free delivery service  for food and drugs. Interested? Join us now! 
        </p>
        <h1>No need to move. We are coming.</h1>
        <div className={styles.actions}>
          <Link className={styles.register} to="/register">
            Join us
          </Link>
          <Link className={styles.login} to="/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
