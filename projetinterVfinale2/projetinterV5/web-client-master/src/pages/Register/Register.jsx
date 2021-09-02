import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { register } from "api/auth"
import styles from "./style.scss"

const Register = () => {
  const history = useHistory()

  useEffect(() => {
    sessionStorage.getItem("token") !== null ? history.push("/") : null
  }, [])
 
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    address: "",
    manager:false,
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    address: "",
    manager:false,
  })

  const handleChange = (e) =>{
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  setFormState({
      ...formState,
      [name]: value
    })}

  const handleSubmit = async () => {
    try {
      await register(formState)
      history.push({ pathname: "/login", state: { email: formState.email } })
    } catch (err) {
      console.log(err)

      console.log("c ca quon cherchee")
      console.log(err.response.data.errors.age)
      console.log(err.response.data.errors.address)
      if(err.response.status === 405)
      setFormErrors({ ...formErrors, email: err.response.data.errors.email ,  address: err.response.data.errors.address,password: err.response.data.errors.password, name: err.response.data.errors.name, age: err.response.data.errors.age,})
      else  if (err.response.status === 402)
      setFormErrors({ ...formErrors, name: err.response.data.errors.name })
      else if (err.response.status === 403)
        setFormErrors({ ...formErrors, age: err.response.data.errors.age })
      else if (err.response.status === 404)
        setFormErrors({ ...formErrors, address: err.response.data.errors.address })
      else if (err.response.status === 400)
        setFormErrors({ ...formErrors, email: err.response.data.errors.email })
      else if (err.response.status === 401)
        setFormErrors({ ...formErrors, password: err.response.data.errors.password })
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <div className={styles["form-group"]}>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          autoComplete="off"
        />
        <small className={styles.error}>{formErrors.name}</small>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="age">Age :</label>
        <input
          type="number"
          name="age"
          value={formState.age}
          onChange={handleChange}
          autoComplete="off"
        />
        <small className={styles.error}>{formErrors.age}</small>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="address">Address :</label>
        <input
          type="text"
          name="address"
          value={formState.address}
          onChange={handleChange}
          autoComplete="off"
        />
        
      <small className={styles.error}>{formErrors.address}</small>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <small className={styles.error}>{formErrors.email}</small>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
        <small className={styles.error}>{formErrors.password}</small>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="Manager">Manager :</label>
        <input
          type="checkbox"
          name="manager"
          value={formState.manager}
          onChange={handleChange}
          required
        />
        <small className={styles.error}>{formErrors.manager}</small>
      </div>
      <button onClick={handleSubmit}>Register</button>

      <div className={styles.link}>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
