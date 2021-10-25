import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { createIngredient } from "../../store/ingredient";
import { getRecipeIngredients } from "../../store/ingredient";

import "./NewRecipeIngredientsPage.css";

const NewRecipeIngredientsPage = () => {
  const [name, setName] = useState("");
  const [amount_unit, setAmountUnit] = useState(1)
  // const [recipeHasIngredients, setHasIngredients] = useState(false)
  const sessionUser = useSelector((state) => state.session.user);
  const ingredients = useSelector((state) => state.ingredients?.ingredients?.recipe_ingredients);
  const history = useHistory();
  const { recipeId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeIngredients(recipeId))
  }, [dispatch, recipeId])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newIngredient = {
      name,
      amount_unit,
      recipe_id: recipeId
    };

    await dispatch(createIngredient(newIngredient));
    await dispatch(getRecipeIngredients(recipeId));
    // history.push(`/recipes/new/${recipeId}/instructions`)
  };
  // useEffect(() => {
  //   setHasIngredients(ingredients?.some((ingredient) => ingredient.recipe_id === +recipeId))
    
  // }, [ingredients, recipeId])
  
  const recipeHasIngredients = ingredients?.some(
    (ingredient) => ingredient.recipe_id === +recipeId
  );

  const NextButton = () => {
    if (recipeHasIngredients) {
      return (
        <Link to={`/recipes/new/${recipeId}/instructions`}>
          <button type="button">Next</button>
        </Link>
      )
    }
    return null;
  }

  return (
    <>
      <div className="new-ingredients-page-container">
        <h1>New Ingredients Page</h1>
        <ul className="new-recipe-ingredients-list">
          {ingredients?.map((ingredient) => (
            <li className="ingredient-item" key={ingredient.id}>
              {ingredient.amount_unit} {ingredient.name}
            </li>
          ))}
        </ul>
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
              required
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
          </div>
          <div className="new-ingredients-buttons-container">
            <button className="new-ingredients-submit-btn">
              Add Ingredient
            </button>
            <Link to="/">
              <button className="new-ingredients-cancel-btn" type="button">
                Cancel
              </button>
            </Link>
            <NextButton />
          </div>
        </form>
      </div>
    </>
  );
}

export default NewRecipeIngredientsPage;