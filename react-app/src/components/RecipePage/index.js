import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneRecipe } from "../../store/recipe";

import "./RecipePage.css";

const RecipePage = () => {
  const sessionUser = useSelector((state) => state.session.user)
  const recipe = useSelector((state) => state.recipes?.recipes)
  
  const { recipeId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneRecipe(recipeId))
  }, [dispatch, recipeId])

  document.title = recipe?.title
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
          {/* <img src={}></img> */}
        </div>
      </div>

    </>
    

  )
}

export default RecipePage;