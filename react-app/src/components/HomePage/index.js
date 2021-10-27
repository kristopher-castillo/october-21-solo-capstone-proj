import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getRecipes } from "../../store/recipe";
import { getImages } from "../../store/image";
import Footer from "../Footer";

import './HomePage.css'

const HomePage = () => {
  const recipes = useSelector((state) => state.recipes?.recipes?.all_recipes);
  const images = useSelector((state) => state.images?.images?.all_images);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getRecipes()), [dispatch]);
  useEffect(() => dispatch(getImages()), [dispatch]);

  let recommendedRecipes;
  if (recipes) {
    recommendedRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 3)
  }

  return (
    <>
      <div className="home-container">
        <Link to="/recipes/4/">
          <div className="home-header-image-container">
            <img
              className="home-header-image"
              src="https://i.ibb.co/Ycypk1P/home-recipe-image.jpg"
              alt="hamburger helper"
            ></img>
            <div className="recipe-badge">Recipe of the Day</div>
            <div className="header-recipe-card">
              <p className="header-recipe-title">Homemade Hamburger Helper</p>
              <p className="header-recipe-blurb">
                This hearty crowd-pleaser makes good use of leftovers
              </p>
              <p className="header-recipe-author">By demo</p>
            </div>
          </div>
        </Link>
        <div className="home-body-container">
          <h1 className="home-what-to-cook">What To Cook This Week</h1>
          <hr className="what-to-cook-break"></hr>
          <div className="recommended-recipes-container">
            {recommendedRecipes?.map((recipe) => (
              <Link to={`/recipes/${recipe?.id}`}>
                <div className="recommended-recipe-card" key={recipe?.id}>
                  <img
                    className="recommended-recipe-card-img"
                    src={
                      images?.find((image) => image.recipe_id === recipe?.id)
                        .image_url
                    }
                    alt="recipe card"
                  ></img>
                  <div className="recommended-recipe-card-title">
                    {recipe?.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;