import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginSignupModal from '../LoginSignupModal';

import "./NavBar.css"

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const location = useLocation().pathname;
  const restrictedPage = /\d/.test(location);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="user-container-loggedin">
        <NavLink
          className="new-recipe-link"
          to="/recipes/new"
          exact={true}
          activeClassName="active"
        >
          New Recipe
        </NavLink>
        <LogoutButton />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="user-container-loggedout">
        <LoginSignupModal restrictedAccess={!sessionUser && restrictedPage} />
      </div>
    );
  }

  return (
    <nav className="nav-bar">
      <div className="nav-logo-container">
        <NavLink to="/" exact={true} className="logo-link">
          {/* <button className="nav-logo-button"></button> */}
          <p className="nav-logo-text">|Cooking</p>
        </NavLink>
      </div>

      <div className="user-container">
        <div>
          <NavLink to="/recipes" exact={true} className="recipes-link">
            <button className="recipes-link-btn">Recipes</button>
          </NavLink>
        </div>
        {sessionLinks}
      </div>
    </nav>
  );
}

export default NavBar;
