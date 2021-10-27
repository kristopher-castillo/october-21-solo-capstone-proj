import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginSignupModal from '../LoginSignupModal';

import "./NavBar.css"

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="user-container">
        <LogoutButton />
      </div>
      
    )
  } else {
    sessionLinks = (
      <div className="user-container">
        <LoginSignupModal />
      </div>
    )
  }

  return (
    <nav className="nav-bar">
      <div className="nav-logo-container">
        <NavLink to='/' exact={true} activeClassName='logo-link'>
          {/* <button className="nav-logo-button"></button> */}
          <p className="nav-logo-text">|Cooking</p>
        </NavLink>
      </div>
      <div>
        <NavLink to='/recipes/1' exact={true} activeClassName='active'>
          Recipes
        </NavLink>
      </div>
      <div>
        <NavLink to='/recipes/new' exact={true} activeClassName='active'>
          New Recipe
        </NavLink>
      </div>
      <div>
        {sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
