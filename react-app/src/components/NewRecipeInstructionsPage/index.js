import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { createInstructions } from "../../store/instructions";

import "./NewRecipeInstructionsPage.css";

const NewRecipeInstructionsPage = () => {
  const [step, setStep] = useState(1)
  const [content, setContent] = useState("")
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const { recipeId } = useParams();

  const dispatch = useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();

      const newInstructions = {
        step,
        content,
        recipe_id: recipeId
      };

      dispatch(createInstructions(newInstructions));
      history.push(`/recipes/${recipeId}`)
    };

  return (
    <>
      <div className="new-instructions-page-container">
        <h1>New Instructions Page</h1>
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
            {/* <ul className="new-recipe-steps-list">
            {instructions?.map((instruction) => (
              <>
                <h4 className="instructions-step-num">
                  Step {instruction.step}
                </h4>
                <p className="instructions-step-content">
                  {" "}
                  {instruction.content}
                </p>
              </>
            ))}
          </ul> */}
          </div>
          <div className="new-instructions-buttons-container">
            <button className="new-instructions-submit-btn">Submit</button>
            <Link to="/">
              <button className="new-instructions-cancel-btn">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewRecipeInstructionsPage;
