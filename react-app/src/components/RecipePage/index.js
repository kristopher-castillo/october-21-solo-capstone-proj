import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./RecipePage.css";

const RecipePage = () => {
  const sessionUser = useSelector((state) => state.session.user)

  return (
    <h1>Hello from Recipe Page</h1>
  )
}

export default RecipePage;