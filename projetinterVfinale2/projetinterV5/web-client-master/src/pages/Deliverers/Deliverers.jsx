import React, { useState, useEffect } from "react"
import { getDeliverers, updateDeliverer } from "api/delivery"
import { Link, Redirect, useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import styles from "./style.scss"
import { colors } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: '#e3efff',
  },
  inline: {
    display: 'inline',
  },
}));

const Deliverers = () => {
  const history = useHistory()

  const [deliverers, setDeliverers] = useState([])
  const classes = useStyles();
  useEffect(() => {
    getDeliverers().then((deliverers) =>
      setDeliverers(
        deliverers.map((deliverer) => ({ ...deliverer, edited: false }))
      )
    )
  }, [])

  const handleChange= (id) => (e) => {
    const input = e.target
    !input.classList.contains(styles.edited) &&
      input.classList.add(styles.edited)

    setDeliverers(
      deliverers.map((i) =>
        i.id === id
          ? { ...i, [e.target.name]: e.target.value, edited: true }
          : i
      )
    )
  }

  const handleSubmit = async () => {
    const updated = deliverers.filter((deliverer) => deliverer.edited)
    updated.map((deliverer) => ({ ...deliverer, edited: false }))

    await Promise.all(updated.map((i) => updateDeliverer(i.id, i)))

    Array.from(document.getElementsByTagName("input")).forEach(
      (element) =>
        element.classList.contains(styles.edited) &&
        element.classList.remove(styles.edited)
    )
    history.push("/dashboard")
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Deliverers</h1>
      <div className={styles.cards}>
        {deliverers.map((deliverer) => (
        <List className={classes.root}>
        <ListItem  key={deliverer.id} alignItems="flex-start">
          <ListItemAvatar >
            <Avatar  className={styles.avatar} src="/broken-image.jpg" />
          </ListItemAvatar>
          <ListItemText  
            secondary={
              <React.Fragment>
                <div>
            
              <label  className={styles.labelAvatar}>Name: </label>
              <input
                type="text"
                name="name"
                onChange={handleChange(deliverer.id)}
                value={deliverer.name}
              />
            </div>
            <div className={styles["form-group"]}>
              <label className={styles.labelAvatar}>Age: </label>
              <input className={styles.inputAge} id="input_age"
                type="number"
                name="age"
                onChange={handleChange(deliverer.id)}
                value={deliverer.age}
              />
            </div>
            <div className={styles["form-group"]}>
              <label className={styles.labelAvatar} >Email: </label>
              <input
                type="email"
                name="email"
                onChange={handleChange(deliverer.id)}
                value={deliverer.email}
              />
            </div>
           
            
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      
      </List>
        ))}
      </div>
      {deliverers.length > 0 && (
        <button onClick={handleSubmit}>Save Changes</button>
      )}
      {deliverers.length == 0 && <h2>There are no available deliverers</h2>}
    </div>
  )
}

export default Deliverers
