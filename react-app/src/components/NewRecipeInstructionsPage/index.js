import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { createInstructions } from "../../store/instructions";

import "./NewRecipeInstructionsPage.css";

const NewRecipeInstructionsPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const dispatch = useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();

      const newInstructions = {

      };

      dispatch(createInstructions(newInstructions));
    };

  return (
    <>
      <h1>New Instructions Page</h1>
    </>
  );
};

export default NewRecipeInstructionsPage;
