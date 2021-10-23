import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { createIngredient } from "../../store/ingredient";

import "./NewRecipeIngredientsPage.css";

const NewRecipeIngredientsPage = () => {

  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIngredient = {};

    dispatch(createIngredient(newIngredient));
  };

  return (
    <>
      <h1>New Ingredients Page</h1>
    </>
  );
}

export default NewRecipeIngredientsPage;