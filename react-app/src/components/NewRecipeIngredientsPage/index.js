import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { createIngredient } from "../../store/ingredient";

import "./NewRecipeIngredientsPage.css";

const NewRecipeIngredientsPage = () => {
  const [name, setName] = useState("");
  const [amount_unit, setAmountUnit] = useState(1)
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const { recipeId } = useParams();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIngredient = {
      name,
      amount_unit,
      recipe_id: recipeId
    };

    dispatch(createIngredient(newIngredient));
  };

  return (
    <>
      <div className="new-ingredients-page-container">
        <h1>New Ingredients Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="new-ingredients-container">
            <h3 className="new-ingredients-title">Ingredients</h3>
            <label>Ingredient Name: </label>
            <input
              className="new-ingredient-name"
              type="text"
              name="ingredient-name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            ></input>
            <label>Amount: </label>
            <input
              className="new-ingredient-amount"
              type="number"
              min="1"
              max="100"
              name="ingredient-amount"
              onChange={(e) => {
                setAmountUnit(e.target.value);
              }}
              value={amount_unit}
            ></input>
            {/* <ul className="new-recipe-ingredients-list">
            {ingredients?.map((ingredient) => (
              <li className="ingredient-item" key={ingredient.id}>
                {ingredient.amount_unit} {ingredient.name}
              </li>
            ))}
          </ul> */}
          </div>
          <div className="new-ingredients-buttons-container">
            <button className="new-ingredients-submit-btn">Submit</button>
            <Link to="/">
              <button className="new-ingredients-cancel-btn">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewRecipeIngredientsPage;