import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createRecipe } from "../../store/recipe";

import "./NewRecipePage.css";

const NewRecipePage = () => {
  const [title, setTitle] = useState("");
  const [yieldAmount, setYieldAmount] = useState(1);
  const [time, setTime] = useState(0);
  const [description, setDescription] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const dispatch = useDispatch()

  return (
    <>
      
      <div className="new-recipe-container">
        <h1>New Recipe Page</h1>
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
              value={yieldAmount}
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
              value={time}
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
        <hr></hr>
        <div className="new-recipe-middle-container">
          <div className="new-recipe-ingredients-container">
            <h3 className="new-recipe-ingredients-title">Ingredients</h3>
            <label>Ingredient Name: </label>
            <input
              className="new-recipe-ingredient"
              type="text"
              name="ingredient"
            ></input>
            <label>Amount: </label>
            <input
              className="new-recipe-ingredient-amount"
              type="number"
              min="1"
              max="100"
              name="ingredient-amount"
            ></input>
            {/* <ul className="new-recipe-ingredients-list">
              {ingredients?.map((ingredient) => (
                <li className="ingredient-item" key={ingredient.id}>
                  {ingredient.amount_unit} {ingredient.name}
                </li>
              ))}
            </ul> */}
          </div>
          <div className="new-recipe-steps-container">
            <h3 className="new-recipe-steps-title">Preparation</h3>
            <textarea
              className="new-recipe-step-text"
              name="step"
              placeholder="Add a step to your recipe here."
            ></textarea>
            <label>Step Number: </label>
            <input
              className="new-recipe-step-num"
              type="number"
              min="1"
              max="10"
              name="step"
            ></input>
            {/* <ul className="new-recipe-steps-list">
              {instructions?.map((instruction) => (
                <>
                  <h4 className="instructions-step-num">
                    Step {instruction.step}
                  </h4>
                  <p className="instructions-step-content">
                    {" "}
                    {instruction.content}
                  </p>
                </>
              ))}
            </ul> */}
          </div>
        </div>
        <div className="new-recipe-buttons-container">
          <button className="new-recipe-submit-btn">Submit</button>
          <button
            type="button"
            className="new-recipe-cancel-btn"
            // onClick={history.push('/')}
          >
            Cancel
          </button>
        </div>
        
      </div>
    </>
  );
}

export default NewRecipePage;