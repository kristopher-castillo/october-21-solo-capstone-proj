import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneRecipe } from "../../store/recipe";
import { getImages } from "../../store/image";
import { getRecipeIngredients } from "../../store/ingredient";
import { getRecipeInstructions } from "../../store/instructions";

import "./RecipePage.css";

const RecipePage = () => {
  const sessionUser = useSelector((state) => state.session.user)
  const recipe = useSelector((state) => state.recipes?.recipes)
  const images = useSelector((state) => state.images?.images?.all_images)
  const ingredients = useSelector((state) => state.ingredients?.ingredients?.recipe_ingredients)
  const instructions = useSelector((state) => state.instructions?.instructions?.recipe_instructions)
  const { recipeId } = useParams();
  const recipeImage = images?.find((image) => image.recipe_id === +recipeId)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneRecipe(recipeId))
  }, [dispatch, recipeId])

  useEffect(() => {
    dispatch(getImages())
  }, [dispatch])

  useEffect(() => {
    dispatch(getRecipeIngredients(recipeId))
  }, [dispatch, recipeId])

  useEffect(() => {
    dispatch(getRecipeInstructions(recipeId))
  }, [dispatch, recipeId])

  if (recipe?.title) {
    document.title = recipe?.title
  }
  return (
    <>
      <h1>Hello from Recipe Page</h1>
      <div className="recipe-container">
        <div className="recipe-info-container">
          <h2 className="recipe-title">{recipe?.title}</h2>
          <h3 className="recipe-author">By Author</h3>
          <p className="recipe-yield">Yield: {recipe?.yield_amount} servings</p>
          <p className="recipe-time">Time: {recipe?.completion_time} minutes</p>
          <p className="recipe-description">{recipe?.description}</p>
          <img src={recipeImage?.image_url} alt={recipeId}></img>
        </div>
        <div className="recipe-ingredients-container">
          <h3 className="recipe-ingredients-title">Ingredients</h3>
          <ul className="recipe-ingredients-list">
            {ingredients?.map((ingredient) => (
              <li className="ingredient-item" key={ingredient.id}>
                {ingredient.amount_unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="recipe-steps-container">
          <h3 className="recipe-steps-title">Preparation</h3>
          <ul className="recipe-steps-list">
            {instructions?.map((instruction) => (
              <>
                <h4 className="instructions-step-num">
                Step {instruction.step}
                </h4>
                <p className="instructions-step-content"> {instruction.content}</p>
              </>
              ))}
          </ul>
        </div>
      </div>

    </>
    

  )
}

export default RecipePage;