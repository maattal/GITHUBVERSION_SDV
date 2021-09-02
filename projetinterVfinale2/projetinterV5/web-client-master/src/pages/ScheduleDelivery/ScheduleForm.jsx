import React from "react"
import { v4 as uuid } from "uuid"
import cs from "classnames"
import dateToString from "core/date_to_string"
import styles from "./style.scss"



const ScheduleForm = ({
  food,
  setFood,
  medicine,
  setMedicine,
  checkboxesError,
  setCheckboxesError,
  addresses,
  setAddresses,
  submit,dates, setDates 
}) => (
    <>
     <div className={styles.container}>
      <div className={styles.inputs}>
      <label htmlFor="ad">Addresses</label>
        {addresses.map((item) => (
          <div className={styles["form-group"]} key={item.id}>
            <input
              className={styles.input}
              type="text"
              value={item.address}
              onChange={(e) =>
               { 
                 
                setAddresses(
                  addresses.map((i) =>
                    i.id === item.id
                      ? { ...i, address: e.target.value, error: "" }
                      : i
                  )
                )}
              }
            />
            <button
              className={styles.button}
              onClick={() =>
                addresses.length > 1
                  ? setAddresses(addresses.filter((e) => e.id !== item.id))
                  : setAddresses(
                    addresses.map((e) =>
                      e.id === item.id
                        ? {
                          ...e,
                          error: "You have to specify at least one address",
                        }
                        : e
                    )
                  )
              }
            >
              &#x2A09;
          </button>
            <small className={styles.error}>{item.error}</small>
          </div>
        ))}       
  <div className={styles.actions}>
        <button
          className={styles.button}
          onClick={() =>
            setAddresses([...addresses, { id: uuid(), address: "" }])
          }
        >
          Add Field
      </button>
     
        {/* <button className={styles.button} onClick={submit}>
          Next
      </button> */}
      </div>
      <br></br>
      <label htmlFor="da">Dates</label>
      {dates.map((item) => (
        
        <div className={styles["form-group"]} key={item.id}>
          <input
            className={styles.input}
            type="date"
            value={
              item.date instanceof Date ? dateToString(item.date) : item.date
            }
            onChange={(e) =>
              setDates(
                dates.map((i) =>
                  i.id === item.id
                    ? { ...i, date: e.target.value, error: "" }
                    : i
                )
              )
            }
          />
          <button
            className={styles.button}
            onClick={() =>
              dates.length > 1
                ? setDates(dates.filter((e) => e.id !== item.id))
                : setDates(
                    dates.map((e) =>
                      e.id === item.id
                        ? {
                            ...e,
                            error: "You have to specify at least one date",
                          }
                        : e
                    )
                  )
            }
          >
            &#x2A09;
          </button>
          <small className={styles.error}>{item.error}</small>
        </div>
      ))}
      <div className={styles.actions}>
      <button
        className={styles.button}
        onClick={() =>
          setDates([...dates, { id: uuid(), date: dateToString(new Date()) }])
        }
      >
        Add Field
      </button> 

    </div>
       
    <br></br>
      
        <div className={styles["form-group"]}>
          <input
            name="food"
            type="checkbox"
            checked={food}
            onChange={(e) => {
              setFood(e.target.checked)
              setCheckboxesError("")
            }}
          />
          <label htmlFor="food">Food</label>
        </div>
        <div className={styles["form-group"]}>
          <input
            name="medicine"
            type="checkbox"
            checked={medicine}
            onChange={(e) => {
              setMedicine(e.target.checked)
              setCheckboxesError("")
            }}
          />
          <label htmlFor="medicine">Medicine</label>
          <br />
          <small className={styles.error}>{checkboxesError}</small> 
          <br></br>
          <button  className={styles.button} onClick={submit}>
        Schedule
      </button>
        </div>
        
       

    </div>
    </div>
    
    </>
  )

export default ScheduleForm
