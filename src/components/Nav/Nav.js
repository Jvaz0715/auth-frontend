import React, { Component } from "react";
// link, navlink will make links in our nav bar work better, we get it from the react-router-dom dependency
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
export class Nav extends Component {
  render() {
    return (
      <nav className="Navbar">
        <div className="h1-logo">
          <h1>
            <Link to="/">Movie with friends!</Link>
          </h1>
        </div>
        <div className="right-side-nav">
          <ul>
            <li>
              <NavLink activeClassName="selected" to="/sign-up">
                Sign up
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={{ borderBottom: "1px solid white" }}
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Nav;


/*

Nav.js is created as the app's navigation bar. There are discernable differences between "Link" and "NavLink" In order to make more readable code, we do not directly put the Nav.js code in the app.js file.

*/