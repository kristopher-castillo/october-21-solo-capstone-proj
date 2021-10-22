import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createRecipe } from "../../store/recipe";

import "./NewRecipePage.css";

const NewRecipePage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch()

  return (
    <h1>New Recipe Page</h1>
  )
}

export default NewRecipePage;