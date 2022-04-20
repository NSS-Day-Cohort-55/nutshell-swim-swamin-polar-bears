import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"

export const NavBar = ({clearUser}) => {
  return (
    <nav className="navbar text-white flex-md-nowrap p-0 shadow">

      <img className="logo" src="../images/Swimswamminpolarbears(4).png" alt="logo"/>
      <img className="logo2" src="../images/N5.png" alt="logo"/>

      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <Link className="nav-link" to="/">Articles</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/friends">Friends</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/messages">Messages</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tasks">Tasks</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/events">Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">Find Friends</Link>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link" onClick={clearUser}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}
