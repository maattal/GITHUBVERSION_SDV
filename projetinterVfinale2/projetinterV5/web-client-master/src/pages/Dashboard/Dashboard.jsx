import React from "react"
import Deliveries from "./Deliveries"
import SimpleTabs from "./Tabs"
import styles from "./style.scss"

const Dashboard = () => {
  const manager = sessionStorage.getItem("manager") === "true"

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      
      {manager && (<SimpleTabs/>)}

      {!manager && 
      (<div><p>Here your deliveries for the day, once you complete it click on it to mark it done : </p><Deliveries/></div>)}
  </div>
  )
}

export default Dashboard
