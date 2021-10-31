import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import {
  createInstructions,
  getRecipeInstructions, updateInstructions, deleteInstructions
} from "../../store/instructions";

import "./EditRecipeInstructionsPage.css";

const EditRecipeInstructionsPage = () => {
  const [step, setStep] = useState(1);
  const [content, setContent] = useState("");
  const [editInstructionsId, setEditInstructionsId] = useState("");
  const [hideAddForm, setHideAddForm] = useState(false);
  const [hideEditForm, setHideEditForm] = useState(true);
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

  const handleSubmit =  (e) => {
    e.preventDefault();

    const newInstructions = {
      step,
      content,
      recipe_id: recipeId,
    };

    dispatch(createInstructions(newInstructions));
    setContent("");
    setEditInstructionsId("");
    setStep(1);
  };

  const handleEditSubmit =  (e) => {
    e.preventDefault();

    const editedInstructions = {
      step,
      content,
      recipe_id: recipeId,
    };

    dispatch(updateInstructions(editedInstructions, editInstructionsId));
    setHideAddForm(false);
    setHideEditForm(true);
    setContent("");
    setEditInstructionsId("");
    setStep(1);
  };

  const handleInstructionDelete = (e, instructionId) => {
    e.preventDefault();

    dispatch(deleteInstructions(instructionId, recipeId));
  };

  const handleInstructionEdit = (
    e,
    instructionId,
    instructionStep,
    instructionContent
  ) => {
    e.preventDefault();

    setStep(instructionStep);
    setContent(instructionContent);
    setEditInstructionsId(instructionId);
    setHideAddForm(true);
    setHideEditForm(false);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setStep(1);
    setContent("");
    setEditInstructionsId("");
    setHideAddForm(false);
    setHideEditForm(true);
  };

  const recipeHasInstructions = instructions?.some(
    (ingredient) => ingredient.recipe_id === +recipeId
  );

  const SubmitButton = () => {
    if (recipeHasInstructions) {
      return (
        <Link to={`/recipes/${recipeId}`}>
          <button type="button">Submit</button>
        </Link>
      );
    }
    return null;
  };

  if (!sessionUser) history.push("/");

  document.title = "Edit Recipe";

  return (
    <>
      <div className="edit-instructions-page-container">
        <div className="edit-steps-list-container">
          <h1 className="edit-instructions-page-title">
            Edit Instructions Page
          </h1>
          <ul className="edit-recipe-steps-list">
            {instructions?.map((instruction) => (
              <React.Fragment key={instruction?.id}>
                <h4
                  className="instructions-step-num"
                  key={instruction?.id + "num"}
                >
                  Step {instruction.step}
                  <span
                    className="ingredient-item-remove"
                    key={instruction?.id + "remove"}
                    onClick={(e) => {
                      handleInstructionDelete(e, instruction.id);
                    }}
                  >
                    X
                  </span>
                  <span
                    className="ingredient-item-remove"
                    key={instruction?.id + "edit"}
                    onClick={(e) => {
                      handleInstructionEdit(
                        e,
                        instruction.id,
                        instruction.step,
                        instruction.content
                      );
                    }}
                  >
                    Edit
                  </span>
                </h4>
                <p
                  className="instructions-step-content"
                  key={instruction?.id + "content"}
                >
                  {instruction.content}
                </p>
              </React.Fragment>
            ))}
          </ul>
        </div>

        <h3 className="edit-instructions-title">Preparation</h3>
        <div className="edit-instructions-body-container">
          <div
            className="edit-instructions-form-container"
            id="inst-add"
            hidden={hideAddForm}
          >
            <form onSubmit={handleSubmit}>
              <textarea
                className="edit-instructions-content"
                name="instructions-content"
                placeholder="Add a step to your recipe here."
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
                required
              ></textarea>
              <label>Step Number: </label>
              <input
                className="edit-instructions-num"
                name="instructions-num"
                type="number"
                min="1"
                max="10"
                onChange={(e) => {
                  setStep(e.target.value);
                }}
                value={step}
              ></input>
              <button className="edit-instructions-submit-btn">Add Step</button>
            </form>
          </div>
          <div
            className="edit-instructions-form-container"
            id="inst-edit"
            hidden={hideEditForm}
          >
            <form onSubmit={handleEditSubmit}>
              <label>Instructions:</label>
              <textarea
                className="edit-instructions-content"
                name="instructions-content"
                placeholder="Add a step to your recipe here."
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                value={content}
              ></textarea>
              <label>Step Number: </label>
              <input
                className="edit-instructions-num"
                name="instructions-num"
                type="number"
                min="1"
                max="10"
                onChange={(e) => {
                  setStep(e.target.value);
                }}
                value={step}
              ></input>
              <div className="edit-form-buttons-container">
                <button className="edit-instructions-submit-btn">
                  Edit Step
                </button>
                <button
                  className="edit-instructions-cancel-edit-btn"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="edit-instructions-buttons-container">
          <Link to={`/recipes/${recipeId}`}>
            <button className="edit-instructions-cancel-btn">Cancel</button>
          </Link>
          <SubmitButton />
        </div>
      </div>
    </>
  );
}

export default EditRecipeInstructionsPage;