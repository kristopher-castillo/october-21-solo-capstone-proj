import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  createInstructions,
  getRecipeInstructions,
} from "../../store/instructions";


import "./EditRecipeInstructionsPage.css";

const EditRecipeInstructionsPage = () => {
  const [step, setStep] = useState(1);
  const [content, setContent] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const instructions = useSelector(
    (state) => state.instructions?.instructions?.recipe_instructions
  );

  const history = useHistory();
  const { recipeId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeInstructions(recipeId));
  }, [dispatch, recipeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newInstructions = {
      step,
      content,
      recipe_id: recipeId,
    };

    await dispatch(createInstructions(newInstructions));
    await dispatch(getRecipeInstructions(recipeId));
  };

  const recipeHasInstructions = instructions?.some(
    (ingredient) => ingredient.recipe_id === +recipeId
  );

  const NextButton = () => {
    if (recipeHasInstructions) {
      return (
        <Link to={`/recipes/${recipeId}`}>
          <button type="button">Next</button>
        </Link>
      );
    }
    return null;
  };

  if (!sessionUser) history.push("/");

  return (
    <>
      <div className="edit-instructions-page-container">
        <h1>Edit Instructions Page</h1>
        <ul className="new-recipe-steps-list">
          {instructions?.map((instruction) => (
            <>
              <h4 className="instructions-step-num">Step {instruction.step}</h4>
              <p className="instructions-step-content">
                {" "}
                {instruction.content}
              </p>
            </>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <div className="new-instructions-container">
            <h3 className="new-instructions-title">Preparation</h3>
            <textarea
              className="new-instructions-content"
              name="instructions-content"
              placeholder="Add a step to your recipe here."
              onChange={(e) => {
                setContent(e.target.value);
              }}
              value={content}
            ></textarea>
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
          </div>
          <div className="new-instructions-buttons-container">
            <button className="new-instructions-submit-btn">Add Step</button>
            <Link to="/">
              <button className="new-instructions-cancel-btn">Cancel</button>
            </Link>
            <NextButton />
          </div>
        </form>
      </div>
    </>
  );
}

export default EditRecipeInstructionsPage;