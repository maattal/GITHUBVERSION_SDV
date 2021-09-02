import React, { useState, useEffect } from "react"

import MapView from "components/MapView"

import {
  getDeliveriesForToday,
  getDeliveriesForDeliverer,
  getAllDeliveriesHomePage,
  markDeliveryAsDone,
} from "api/delivery"


const Deliveries = (props) => {
  const [deliveries, setDeliveries] = useState([])

  const manager = sessionStorage.getItem("manager") === "true"
  const userId = sessionStorage.getItem("id")

  useEffect(() => {
    console.log(props.dataFromParent)
    if (manager && props.dataFromParent==false)
    {console.log("hello1")
    getAllDeliveriesHomePage().then((deliveries) => setDeliveries(deliveries))}
    else if (manager && props.dataFromParent==true)
    {console.log("hello2")

    getDeliveriesForToday().then((deliveries) => setDeliveries(deliveries))}
    else
      getDeliveriesForDeliverer(userId).then((deliveries) =>
        setDeliveries(deliveries)
      )
  }, [])

  const handleMarkerClick = async (id) => {
    if (confirm("Is the delivery done?")) {
      console.log("c sarahhhhhhhhhh")
      await markDeliveryAsDone(id)
      console.log(id.done)
      setDeliveries(deliveries.filter((d) => d.id !== id))
    }
  }
 //afficher les deliveries dans la carte 
  return (
    <>
     {deliveries.length === 0 ? ( 
      <div><br></br>
     
      <p>You have no delivery for today</p></div>
      ) : (
        <div><br></br><br></br>
        <MapView deliveries={deliveries} onMarkerClick={handleMarkerClick} />
        </div>
      )}
    </>
  )
}

export default Deliveries
