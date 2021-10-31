import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { createRecipe } from "../../store/recipe";
import { createImage } from "../../store/image";

import "./NewRecipePage.css";

const NewRecipePage = () => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [yield_amount, setYieldAmount] = useState(1);
  const [completion_time, setTime] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("")
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newRecipe = {
      title,
      description,
      yield_amount,
      completion_time
    }
    const createdRecipe = await dispatch(createRecipe(newRecipe))
    if (Array.isArray(createdRecipe)) {
      setErrors(createdRecipe);
    } else if (typeof createdRecipe === "object") {
      const imageData = new FormData();
      imageData.append("image", image)
      imageData.append("recipe_id", createdRecipe.id);
    
      await dispatch(createImage(imageData))

      history.push(`/recipes/new/${createdRecipe.id}/ingredients`)
    }
  }

  if (!sessionUser) history.push('/')

  document.title = "New Recipe";

  return (
    <>
      <div className="new-recipe-container">
        <h1>Add Your Own Recipe</h1>
        <form onSubmit={handleSubmit} id="new-recipe-form">
          <div className="errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error.slice(error.indexOf(":") + 2)}</div>
            ))}
          </div>
          <div className="new-recipe-title-container">
            <label>Recipe Title:</label>
            <input
              className="new-recipe-title"
              type="text"
              name="title"
              maxLength="100"
              placeholder="Type your recipe's title here"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              required
            ></input>
          </div>
          <hr></hr>
          <div className="new-recipe-head-container">
            <div className="new-recipe-info-container">
              <label>Recipe Yield: </label>
              <input
                className="new-recipe-yield"
                type="number"
                min="1"
                max="100"
                name="yield"
                onChange={(e) => {
                  setYieldAmount(e.target.value);
                }}
                value={yield_amount}
              ></input>
              <label>Time to Completion (in minutes): </label>
              <input
                className="new-recipe-time"
                type="number"
                min="1"
                max="100"
                name="time"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                value={completion_time}
              ></input>
              <label>Description:</label>
              <textarea
                className="new-recipe-description"
                placeholder="Type your recipe's description here."
                rows="6"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
                required
              ></textarea>
            </div>
            <div className="new-recipe-image-container">
              <label>Choose an image for your recipe:</label>
              <input
                className="image-upload"
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              ></input>
            </div>
          </div>
          <div className="new-recipe-buttons-container">
            <Link to="/">
              <button type="button" className="new-recipe-cancel-btn">
                Cancel
              </button>
            </Link>
            <button className="new-recipe-next-btn">Next</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewRecipePage;