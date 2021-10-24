import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { createRecipe } from "../../store/recipe";

import "./NewRecipePage.css";

const NewRecipePage = () => {
  const [title, setTitle] = useState("");
  const [yield_amount, setYieldAmount] = useState(1);
  const [completion_time, setTime] = useState(0);
  const [description, setDescription] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newRecipe = {
      title,
      description,
      yield_amount,
      completion_time
    }

    const createdRecipe = await dispatch(createRecipe(newRecipe))
    history.push(`/recipes/new/${createdRecipe.id}/ingredients`)
  }

  return (
    <>
      <div className="new-recipe-container">
        <h1>New Recipe Page</h1>
        <form onSubmit={handleSubmit} id="new-recipe-form">
          <div className="new-recipe-title-container">
            <label>Recipe Title:</label>
            <input
              className="new-recipe-title"
              type="text"
              name="title"
              placeholder="Type your recipe's title here"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            ></input>
          </div>
          <hr></hr>
          <div className="new-recipe-head-container">
            <div className="new-recipe-info-container">
              <label>Recipe Yield: </label>
              <input
                className="new-recipe-yield"
                type="number"
                min="1"
                max="100"
                name="yield"
                onChange={(e) => {
                  setYieldAmount(e.target.value);
                }}
                value={yield_amount}
              ></input>
              <label>Time to Completion: </label>
              <input
                className="new-recipe-time"
                type="number"
                min="0"
                max="100"
                name="time"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                value={completion_time}
              ></input>
              <textarea
                className="new-recipe-description"
                placeholder="Type your recipe's description here."
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              ></textarea>
            </div>
            <div className="new-recipe-image-container">
              {/* <img src={recipeImage?.image_url} alt={recipeId}></img> */}
              IMAGE UPLOAD HERE
            </div>
          </div>
          <div className="new-recipe-buttons-container">
            <button className="new-recipe-submit-btn">Submit</button>
            <Link to="/">
              <button type="button" className="new-recipe-cancel-btn">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewRecipePage;