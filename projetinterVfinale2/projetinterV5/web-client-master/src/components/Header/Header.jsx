import React from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import styles from "./style.scss"

const Header = () => {
  const { pathname } = useLocation()
  const history = useHistory()

  let token = sessionStorage.getItem("token")
  let name = null

  if (token !== null) name = sessionStorage.getItem("name")

  const logout = () => {
    sessionStorage.clear()
    history.push("/")
  }

  const GuestLinks = () => (
    <>
      <li>
        <Link className={pathname === "/" ? styles.active : null} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link
          className={pathname === "/login" ? styles.active : null}
          to="/login"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          className={pathname === "/register" ? styles.active : null}
          to="/register"
        >
          Register
        </Link>
      </li>
    </>
  )

  const manager = sessionStorage.getItem("manager") == "true"

  const UserLinks = () => (
    <>
      <li>
        <Link  className={pathname==="/dashboard"? styles.active:null } to="/dashboard">
         Dashboard 
        </Link>
      </li>
      <li>
        <Link
          className={
            pathname.startsWith("/blog") || pathname === "/write-post"
              ? styles.active
              : null
          }
          to="/blog"
        >
          Blog
        </Link>
      </li>
      <li>
        <Link
          className={pathname === "/chat" ? styles.active : null}
          to="/chat"
        >
          Chat
        </Link>
      </li>

      {manager && (
        <li>
          <Link
            className={pathname === "/deliverers" ? styles.active : null}
            to="/deliverers"
          >
            Deliverers
          </Link>
        </li>
      )}
      <li>
        <a onClick={logout}>Logout</a>
      </li>
    </>
  )

  return (
    <header>
      {/* <Link className={styles.logo} to="/">
        <h1>Distribute</h1>
      </Link> */}
      <nav>
        <ul>{token === null ? <GuestLinks /> : <UserLinks />}</ul>
      </nav>
    </header>
  )
}

export default Header
