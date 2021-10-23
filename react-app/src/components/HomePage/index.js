import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import './HomePage.css'

const HomePage = () => {


  return (
    <>
      <div className="home-container">
        <div className="home-header-image-container">
          <img
            className="home-header-image"
            src="https://i.ibb.co/Ycypk1P/home-recipe-image.jpg"
            alt="hamburger helper"
          ></img>
          <div className="recipe-badge">Recipe of the Day</div>
          <div className="header-recipe-card">
            <p className="header-recipe-title">Homemade Hamburger Helper</p>
            <p className="header-recipe-blurb">
              This hearty crowd-pleaser makes good use of leftovers
            </p>
            <p className="header-recipe-author">Priya Krishna</p>
          </div>
        </div>
        <div className="home-body-container">
          <h1 className="home-what-to-cook">What To Cook This Week</h1>
          <hr className="what-to-cook-break"></hr>
        </div>
      </div>
    </>
  );
}

export default HomePage;