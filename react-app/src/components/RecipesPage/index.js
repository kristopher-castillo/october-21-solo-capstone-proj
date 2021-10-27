import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { getRecipes } from "../../store/recipe";
import { getImages } from "../../store/image";

import "./RecipesPage.css"

const RecipesPage = () => {
  const recipes = useSelector((state) => state.recipes?.recipes?.all_recipes)
  const images = useSelector((state) => state.images?.images?.all_images);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getRecipes()), [dispatch])
  useEffect(() => dispatch(getImages()), [dispatch])

  return (
    <div className="all-recipes-page-container">
      <h1>Browse Recipes</h1>
      <div className="recipe-card-container">
        {recipes?.map((recipe, ind) => (
        <Link to={`/recipes/${recipe?.id}`}>
          <div className="recipe-card" key={ind}>
            <img className="recipe-card-img"
              src={images?.find((image => image.recipe_id === recipe?.id)).image_url}
              alt="recipe card"
            >
            </img>
            <div className="recipe-card-title">{recipe?.title}</div>
          </div>
        </Link>
      ))}   
      </div>
      

    </div>
  )

}

export default RecipesPage;