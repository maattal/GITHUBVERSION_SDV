import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { v4 as uuid } from "uuid"
import { scheduleDelivery } from "api/delivery"
import dateToString from "core/date_to_string"
import removeDuplicates from "core/remove_duplicates"
import ScheduleForm from "./ScheduleForm"
import styles from "./style.scss"

const ScheduleDelivery = () => {
  const history = useHistory()

  //state du check food 
  const [food, setFood] = useState(false)

  //state du check medecine 
  const [medicine, setMedicine] = useState(false)
  const [checkboxesError, setCheckboxesError] = useState("")
  const today = new Date().setHours(0, 0, 0, 0);
  //state du from de schedule - la ou ya les donnes addresses 
  const [addresses, setAddresses] = useState([
    {
      id: uuid(),
      address: "",
      error: "",
    },
  ])
  const [dates, setDates] = useState([
    { id: uuid(), date: dateToString(new Date()) },
  ])

  //verify if the addresses fields are fill and one of the checkbox at least is checked
  const  submitShedule= async() => {
    if (addresses.some((a) => a.address.trim().length === 0))
     { setAddresses(
        addresses.map((e) =>
          e.address.trim().length > 0
            ? e
            : { ...e, error: "Please fill this field or delete it" }
        )
      )
     }
    else if (!food && !medicine)
     { setCheckboxesError("Please select either food or medicine")
      }
    else  if (dates.some((d) => new Date(d.date).getTime() < today)) {
          setDates(
            dates.map((d) =>
              new Date(d.date).getTime() < today
                ? { ...d, error: "Date must be before today" }
                : d
            )
          )
          
   return
  }

   const data = {
      addresses: removeDuplicates(addresses.map((a) => a.address)),
      dates: removeDuplicates(dates.map((d) => d.date)),
      food,
      medicine,
    }


    // Send data, then redirect
    await scheduleDelivery(data)
    
    
    confirm("The delivery has been successfully scheduled")
    window.location.reload()
  }
  
  return (
    <div className={styles.container}>
      
        <ScheduleForm
          food={food}
          setFood={setFood}
          medicine={medicine}
          setMedicine={setMedicine}
          checkboxesError={checkboxesError}
          setCheckboxesError={setCheckboxesError}
          addresses={addresses}
          setAddresses={setAddresses}
          submit={submitShedule}
          dates={dates}
          setDates={setDates}
        />
      
    </div>
  )
}

export default ScheduleDelivery
