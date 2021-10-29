import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { createInstructions, deleteInstructions, getRecipeInstructions } from "../../store/instructions";
import { getOneRecipe, deleteRecipe } from "../../store/recipe";
import { getImages } from "../../store/image";
import {getRecipeIngredients} from "../../store/ingredient";

import "./NewRecipeInstructionsPage.css";

const NewRecipeInstructionsPage = () => {
  const [step, setStep] = useState(1)
  const [content, setContent] = useState("")
  const { recipeId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const instructions = useSelector((state) => state.instructions?.instructions?.recipe_instructions);
  const recipe = useSelector((state) => state.recipes?.recipes);
  const images = useSelector((state) => state.images?.images?.all_images);
  const ingredients = useSelector(
    (state) => state.ingredients?.ingredients?.recipe_ingredients
  );
  const recipeImage = images?.find((image) => image.recipe_id === +recipeId);
  const recipeHasInstructions = instructions?.some(
    (ingredient) => ingredient.recipe_id === +recipeId
  );
  const [hidePlaceholder, setHidePlaceholder] = useState(recipeHasInstructions)
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeInstructions(recipeId));
  }, [dispatch, recipeId]);

  useEffect(() => {
    dispatch(getRecipeIngredients(recipeId));
  }, [dispatch, recipeId]);

  useEffect(() => {
    dispatch(getOneRecipe(recipeId));
    setHidePlaceholder(recipeHasInstructions)
  }, [dispatch, recipeHasInstructions, recipeId]);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newInstructions = {
      step,
      content,
      recipe_id: recipeId
    };

    dispatch(createInstructions(newInstructions));
    setStep(+step + 1)
    setContent("")

  };


  const handleRecipeDelete = (e) => {
    const result = window.confirm(
      "Cancelling will erase your recipe. Click OK to confirm."
    );

    if (result) {
      e.preventDefault();
      dispatch(deleteRecipe(recipeId));
      history.push('/')
    } else if (!result) {
      e.preventDefault();
    }
  };

  const handleInstructionDelete = (e, instructionId) => {
    e.preventDefault();

    dispatch(deleteInstructions(instructionId, recipeId));
  };



  // if (recipeHasInstructions) setHidePlaceholder(true)
    

  const SubmitButton = () => {
    
    return (
      <Link to={`/recipes/${recipeId}`}>
        <button type="button">Submit</button>
      </Link>
    );

  };

  if (!sessionUser) history.push("/");

  document.title = "New Recipe";

  return (
    <>
      <div className="new-instructions-page-container">
        <h1 className="new-instructions-page-title">
          Add Preparation Steps to Your Recipe
        </h1>
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
        <div className="new-instructions-body-container">
          <div
            className="new-ingredients-list-container"
            id="ing-list-instructions"
          >
            <p className="new-ingredients-title">Ingredients</p>
            <div className="new-recipe-ingredients-list">
              {ingredients?.map((ingredient) => (
                <p className="ingredient-item" key={ingredient.id}>
                  {ingredient.amount_unit} {ingredient.name}
                </p>
              ))}
            </div>
          </div>

          <div className="new-instructions-form-container">
            <h3 className="new-instructions-title">Preparation</h3>
            <form onSubmit={handleSubmit}>
              <label>Step Number: </label>
              <input
                className="new-instructions-num"
                name="instructions-num"
                type="number"
                min="1"
                max="10"
                onChange={(e) => {
                  setStep(e.target.value);
                }}
                value={step}
              ></input>
              <textarea
                className="new-instructions-content"
                name="instructions-content"
                placeholder="Add a step to your recipe here."
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
                required
              ></textarea>
              <button className="new-instructions-submit-btn">Add Step</button>
            </form>
          </div>
          <div className="new-steps-list-container">
            <div
              className="placeholder-text-container"
              hidden={hidePlaceholder}
            >
              <p className="new-steps-placeholder" hidden={hidePlaceholder}>
                Your recipe's steps will appear here.
              </p>
            </div>
            <div className="new-recipe-steps-list">
              {instructions?.map((instruction) => (
                <React.Fragment key={instruction?.id}>
                  <h4
                    className="instructions-step-num"
                    key={instruction?.id + "num"}
                  >
                    Step {instruction.step}
                  </h4>
                  <p
                    className="instructions-step-content"
                    key={instruction?.id + "content"}
                  >
                    {instruction.content}
                    <span
                      className="ingredient-item-remove"
                      key={instruction?.id + "remove"}
                      onClick={(e) => {
                        handleInstructionDelete(e, instruction.id);
                      }}
                    >
                      X
                    </span>
                  </p>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="new-instructions-buttons-container">
          <Link to="/">
            <button
              className="new-instructions-cancel-btn"
              type="button"
              onClick={handleRecipeDelete}
            >
              Cancel
            </button>
          </Link>
          <SubmitButton />
        </div>
      </div>
    </>
  );
};

export default NewRecipeInstructionsPage;
