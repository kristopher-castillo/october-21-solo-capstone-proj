import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import "./NavBar.css"

const NavBar = () => {
  return (
    <nav>
    
      <div className="nav-logo-container">
        <NavLink to='/' exact={true} activeClassName='logo-link'>
          <button className="nav-logo-button"></button>
          <p className="nav-logo-text">|Cooking</p>
        </NavLink>
      </div>
      <li>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </li>
      <li>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </li>
      <li>
        <NavLink to='/recipes/2' exact={true} activeClassName='active'>
          Recipe
        </NavLink>
      </li>
      <li>
        <NavLink to='/recipes/new' exact={true} activeClassName='active'>
          New Recipe
        </NavLink>
      </li>
      <li>
        <LogoutButton />
      </li>
      
    </nav>
  );
}

export default NavBar;
