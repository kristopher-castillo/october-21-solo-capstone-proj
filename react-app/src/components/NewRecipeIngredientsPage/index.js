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
    setName("")
    setAmountUnit(1)
  };

  const handleIngredientDelete = (e, ingredientId) => {
    e.preventDefault();

    dispatch(deleteIngredient(ingredientId, recipeId))
  }
  
  const handleRecipeDelete = (e) => {
    const result = window.confirm("Cancelling will erase your recipe. Click OK to confirm.")

    if (result) {
      dispatch(deleteRecipe(recipeId))
    }
    else if (!result) {
      e.preventDefault()
    }
  }

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
        <h1 className="new-ingredients-page-title">Add Ingredients to Your Recipe</h1>
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
        <p className="new-ingredients-title">Ingredients</p>
        <div className="new-ingredients-body-container">
          <div className="new-ingredients-form-container">
            <form onSubmit={handleSubmit}>
              <label>Amount: </label>
              <input
                className="new-ingredient-amount"
                type="number"
                step=".5"
                min=".5"
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
                pattern="^[a-zA-Z_.,!']+$"
                title="Ingredient names must only contain letters"
                name="ingredient-name"
                placeholder="Enter the name an ingredient here"
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
          <div className="new-ingredients-list-container">
            <div className="new-recipe-ingredients-list">
              {ingredients?.map((ingredient) => (
                <p className="ingredient-item" key={ingredient.id}>
                  {ingredient.amount_unit} {ingredient.name}
                  <span
                    className="ingredient-item-remove"
                    onClick={(e) => {
                      handleIngredientDelete(e, ingredient.id);
                    }}
                  >
                    X
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="new-ingredients-buttons-container">
          {/* <Link to={`/recipes/edit/${recipeId}`}>
            <button type="button">Go Back</button>
          </Link> */}
          <Link to="/">
            <button
              className="new-ingredients-cancel-btn"
              type="button"
              onClick={handleRecipeDelete}
            >
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