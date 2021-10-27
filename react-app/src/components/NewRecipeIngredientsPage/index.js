import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getOneRecipe, deleteRecipe } from "../../store/recipe";
import { getImages } from "../../store/image";
import { createIngredient, getRecipeIngredients, deleteIngredient } from "../../store/ingredient";

import "./NewRecipeIngredientsPage.css";

const NewRecipeIngredientsPage = () => {
  const [name, setName] = useState("");
  const [amount_unit, setAmountUnit] = useState(1)
  const recipe = useSelector((state) => state.recipes?.recipes);
  const images = useSelector((state) => state.images?.images?.all_images);
  // const users = useSelector((state) => state.users?.users?.users);
  const sessionUser = useSelector((state) => state.session.user);
  const ingredients = useSelector((state) => state.ingredients?.ingredients?.recipe_ingredients);
  const { recipeId } = useParams();
  const recipeImage = images?.find((image) => image.recipe_id === +recipeId);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeIngredients(recipeId))
  }, [dispatch, recipeId])

  useEffect(() => {
    dispatch(getOneRecipe(recipeId));
  }, [dispatch, recipeId]);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newIngredient = {
      name,
      amount_unit,
      recipe_id: recipeId
    };

    dispatch(createIngredient(newIngredient));
  };
  
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

  if (!sessionUser) history.push("/");

  return (
    <>
      <div className="new-ingredients-page-container">
        <h1>Add Ingredients to Your Recipe</h1>
        <div className="recipe-title-container">
          <h1 className="recipe-title">{recipe?.title}</h1>
        </div>
        <hr></hr>
        <div className="recipe-head-container">
          <div className="recipe-info-container">
            <p className="recipe-yield">
              Yield: <span>{recipe?.yield_amount} servings</span>
            </p>
            <p className="recipe-time">
              Time: <span>{recipe?.completion_time} minutes</span>
            </p>
            <p className="recipe-description">{recipe?.description}</p>
          </div>
          <div className="recipe-image-container">
            <img
              className="recipe-image"
              src={recipeImage?.image_url}
              alt={recipeId}
            ></img>
          </div>
        </div>
        <hr></hr>
        <h3 className="new-ingredients-title">Ingredients</h3>
        <div className="new-ingredients-body-container">
          <div className="new-ingredients-list-container">
            <div className="new-recipe-ingredients-list">
            {ingredients?.map((ingredient) => (
              <p className="ingredient-item" key={ingredient.id}>
                {ingredient.amount_unit} {ingredient.name}
              </p>
            ))}
            </div>
          </div>
          <div className="new-ingredients-form-container">
            <form onSubmit={handleSubmit}>
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
              <button className="new-ingredients-submit-btn">
                  Add Ingredient
                </button>
            </form>
          </div>
        </div>
        <div className="new-ingredients-buttons-container">
          <Link to={`/recipes/new/${recipeId}`}>
            <button type="button">Go Back</button>
          </Link>
          <Link to="/">
            <button className="new-ingredients-cancel-btn" type="button">
              Cancel
            </button>
          </Link>
          <NextButton />
          </div>
      </div>
    </>
  );
}

export default NewRecipeIngredientsPage;