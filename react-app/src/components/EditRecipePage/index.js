import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { updateRecipe, getOneRecipe } from "../../store/recipe";
import { updateImage, getImages } from "../../store/image";

import "./EditRecipePage.css";

const EditRecipePage = () => {
  const {recipeId} = useParams()
  const sessionUser = useSelector((state) => state.session.user);
  const recipe = useSelector((state) => state.recipes?.recipes);
  const users = useSelector((state) => state.users?.users?.users);  
  const images = useSelector((state) => state.images?.images?.all_images);
  const recipeImage = images?.find((image) => image.recipe_id === +recipeId);
  const [title, setTitle] = useState("");
  const [yield_amount, setYieldAmount] = useState(recipe?.yield_amount);
  const [completion_time, setTime] = useState(recipe?.completion_time);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(recipeImage);

  
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneRecipe(recipeId));
  }, [dispatch, recipeId]);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  console.log("recipe", recipe)
  console.log("title", title)
  console.log("yield", yield_amount)
  console.log("time", completion_time)
  console.log("desc", description)
  console.log("image", recipeImage)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      title,
      description,
      yield_amount,
      completion_time,
    };

    const createdRecipe = await dispatch(updateRecipe(updatedRecipe, recipeId));

    if (image) {
      const updatedImageData = new FormData();
      updatedImageData.append("image", image);
      updatedImageData.append("recipe_id", createdRecipe.id);

      dispatch(updateImage(updatedImageData, recipeImage.id));
    }

    history.push(`/recipes/edit/${createdRecipe.id}/ingredients`);
  };

  if (!sessionUser) history.push("/");

  return (
    <>
      <div className="new-recipe-container">
        <h1>Edit Recipe Page</h1>
        <div className="recipe-title-container">
          <h1
            className="recipe-title"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(e) => setTitle(e.target.innerText)}
            value={title}
          >
            {recipe?.title}
          </h1>
        </div>
        <hr></hr>
        <div className="recipe-head-container">
          <form onSubmit={handleSubmit}>
            <div className="recipe-info-container">
              <label>Recipe yield:</label>
              <input
                type="number"
                className="recipe-yield"
                onChange={(e) => setYieldAmount(e.target.value)}
                placeholder={recipe?.yield_amount}
                value={yield_amount}
              ></input>
              <label>Completion time in minutes:</label>
              <input
                type="number"
                className="recipe-time"
                onChange={(e) => setTime(e.target.value)}
                placeholder={recipe?.completion_time}
                value={completion_time}
              ></input>
              <p
                className="recipe-description"
                contentEditable="true"
                suppressContentEditableWarning={true}
                onBlur={(e) => setDescription(e.target.innerText)}
                value={description}
              >
                {recipe?.description}
              </p>
            </div>
            <div className="recipe-image-container">
              <img
                className="recipe-image"
                src={recipeImage?.image_url}
                alt={recipeId}
              ></img>
            </div>
          </form>
        </div>
        <hr></hr>

        <form onSubmit={handleSubmit} id="new-recipe-form">
          <div className="new-recipe-image-container">
            <p className="card-text">Choose an image for your recipe</p>
            <input
              type="file"
              name="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </div>
          <div className="new-recipe-buttons-container">
            <button className="new-recipe-submit-btn">Next</button>
            <Link to="/">
              <button type="button" className="new-recipe-cancel-btn">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );


};

export default EditRecipePage;
