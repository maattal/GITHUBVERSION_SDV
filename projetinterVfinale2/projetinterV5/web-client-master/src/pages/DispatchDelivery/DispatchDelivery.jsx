import React, { useState, useEffect } from "react"
import Multiselect from 'multiselect-react-dropdown';
import {
  getDeliverers,
  getDeliveriesForToday,
  dispatchDeliveries,
} from "api/delivery"

import styles from "./style.scss"
import { useHistory } from "react-router-dom"

const DispatchDelivery = () => {
  const [deliverers, setDeliverers] = useState([])
  const [selected, setselected] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [loadingDeliveries, setLoadingDeliveries] = useState(true)

  const history = useHistory()

  useEffect(() => {
    getDeliverers().then((deliverers) =>
      setDeliverers(deliverers.map((d) => ({ ...d, checked: false })))
    )
  }, [])

  useEffect(() => {
    getDeliveriesForToday().then((deliveries) => {
      setDeliveries(deliveries)
      setLoadingDeliveries(false)
    })
  }, [])

  
const onSelect=(selectedList, selectedItem) =>{
setDeliverers(
  deliverers.map((d) => (d.id === selectedItem.id ? { ...d, checked: true } : d))
)

}

  const onRemove = (selectedList, selectedItem) => {
    setDeliverers(
      deliverers.map((d) => (d.id === selectedItem.id ? { ...d, checked: false } : d))
         
    )
  
  }
  
  const dispatch = () => {
  
    const selected = deliverers.filter((d) => d.checked)
    console.log(selected)
    if (selected.length === 0) {
      alert("Please select at least one deliverer")
      return
    }

    if (selected.length > deliveries.length) {
      alert(
        `There are ${deliveries.length} deliveries for today, but you selected ${selected.length} deliverers`
      )
      return
    }

    // Dispatch
    dispatchDeliveries(selected.map((d) => d.id)).then(() =>
    confirm("the dispatch of deliveries has been well recorded "),
    window.location.reload()
    )
  }

  if (loadingDeliveries) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <h1>Dispatch deliveries</h1>
      {deliveries.length === 0 ? (
        <h3>No deliveries for today</h3>
      ) : (
        <>
          <h3>There are {deliveries.length} deliveries for today</h3>
      
              <Multiselect
options={deliverers} // Options to display in the dropdown
selectedValues={selected} // Preselected value to persist in dropdown
onSelect={onSelect}// Function will trigger on select event
onRemove={onRemove} // onremoveFunction will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>
          
        </>
      )}
      <button onClick={dispatch}>Dispatch</button>
    </div>
  )
}

export default DispatchDelivery