import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import './HomePage.css'

const HomePage = () => {


  return (
    <>
      <div className="home-container"> 
        <div className="home-header-image-container">
          <img className="home-header-image" src="https://i.ibb.co/Ycypk1P/home-recipe-image.jpg" alt="hamburger helper"></img>
        </div>
        <div className="home-body-container">
          <h1 className="home-what-to-cook">What To Cook This Weekend</h1>
          <hr className="what-to-cook-break"></hr>
        </div>
        
        
      </div>
    </>
  )
}

export default HomePage;