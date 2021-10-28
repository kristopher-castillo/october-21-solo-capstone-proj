import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { updateRecipe, getOneRecipe } from "../../store/recipe";
import { updateImage, getImages } from "../../store/image";

import "./EditRecipePage.css";

const EditRecipePage = () => {
  const {recipeId} = useParams()
  const sessionUser = useSelector((state) => state.session.user);
  const recipe = useSelector((state) => state.recipes?.recipes);
  const images = useSelector((state) => state.images?.images?.all_images);
  const recipeImage = images?.find((image) => image.recipe_id === +recipeId);
  const [title, setTitle] = useState("");
  const [yield_amount, setYieldAmount] = useState(1);
  const [completion_time, setTime] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneRecipe(recipeId));
    setTitle(recipe?.title);
    setYieldAmount(recipe?.yield_amount)
    setTime(recipe?.completion_time)
    setDescription(recipe?.description)
  }, [dispatch, recipe?.completion_time, recipe?.description, recipe?.title, recipe?.yield_amount, recipeId]);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // if(!title) setTitle(recipe?.title)
    // if (!description) setDescription(recipe?.description)
    // if (!yield_amount) setYieldAmount(recipe?.yield_amount)
    // if (!completion_time) setTime(recipe?.completion_time)
      
    
    const updatedRecipe = {
      title,
      description,
      yield_amount,
      completion_time,
    }

    console.log(updatedRecipe)

    dispatch(updateRecipe(updatedRecipe, recipeId));
    
    if (image) {
      const updatedImageData = new FormData();
      updatedImageData.append("image", image);
      updatedImageData.append("recipe_id", recipeId);

      dispatch(updateImage(updatedImageData, recipeImage.id));
    }

    history.push(`/recipes/edit/${recipeId}/ingredients`);
  };

  if (!sessionUser) history.push("/");

  document.title = "Edit Recipe";

  return (
    <>
      <div className="new-recipe-container">
        <h1>Click Below to Edit Your Recipe</h1>
        <div className="edit-recipe-head-container">
          <form onSubmit={handleSubmit}>
            <div className="edit-recipe-info-container">
              <label>Recipe title:</label>
              {title ? (
                <input
                  className="edit-recipe-title"
                  type="text"
                  maxLength="100"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              ) : (
                <input
                  className="edit-recipe-title"
                  type="text"
                  maxLength="100"
                  value={recipe?.title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              )}
              <label>Recipe yield:</label>
              {yield_amount ? (
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="edit-recipe-yield"
                  onChange={(e) => setYieldAmount(e.target.value)}
                  value={yield_amount}
                ></input>
              ) : (
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="edit-recipe-yield"
                  onChange={(e) => setYieldAmount(e.target.value)}
                  value={recipe?.yield_amount}
                ></input>
              )}
              <label>Completion time in minutes:</label>
              {completion_time ? (
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="edit-recipe-time"
                  onChange={(e) => setTime(e.target.value)}
                  value={completion_time}
                ></input>
              ) : (
                <input
                  type="number"
                  min="1"
                  max="100"
                  className="edit-recipe-time"
                  onChange={(e) => setTime(e.target.value)}
                  value={recipe?.completion_time}
                ></input>
              )}
              {/* <p
                className="recipe-description"
                contentEditable="true"
                suppressContentEditableWarning={true}
                onBlur={(e) => setDescription(e.target.innerText)}
                value={description}
              >
                {recipe?.description}
              </p> */}
              <label>Recipe description:</label>
              {description ? (
                <textarea
                  className="edit-recipe-description"
                  rows="6"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              ) : (
                <textarea
                  className="edit-recipe-description"
                  rows="6"
                  onChange={(e) => setDescription(e.target.value)}
                  value={recipe?.description}
                ></textarea>
              )}
            </div>
            <div className="edit-recipe-image-container">
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
            <p className="card-text">Choose a new image for your recipe</p>
            <input
              type="file"
              name="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </div>
          <div className="edit-recipe-buttons-container">
            <button className="edit-recipe-submit-btn">Next</button>
            <Link to="/">
              <button type="button" className="edit-recipe-cancel-btn">
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
