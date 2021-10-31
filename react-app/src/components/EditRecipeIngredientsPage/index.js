import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { createIngredient, getRecipeIngredients, updateIngredient, deleteIngredient } from "../../store/ingredient";

import "./EditRecipeIngredientsPage.css";

const EditRecipeIngredientsPage = () => {
  const [name, setName] = useState("");
  const [amount_unit, setAmountUnit] = useState(1)
  const [editIngredientId, setEditIngredientId] = useState("")
  const [hideAddForm, setHideAddForm] = useState(false)
  const [hideEditForm, setHideEditForm] = useState(true)
  const sessionUser = useSelector((state) => state.session.user);
  const ingredients = useSelector((state) => state.ingredients?.ingredients?.recipe_ingredients);
  const history = useHistory();
  const { recipeId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeIngredients(recipeId))
  }, [dispatch, recipeId])

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIngredient = {
      name,
      amount_unit,
      recipe_id: recipeId
    };

    dispatch(createIngredient(newIngredient));
    setName("");
    setAmountUnit(1);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const editedIngredient = {
      name,
      amount_unit,
      recipe_id: recipeId
    };

    dispatch(updateIngredient(editedIngredient, editIngredientId));
    setName("");
    setAmountUnit(1);
    setHideAddForm(false)
    setHideEditForm(true)
  };
  
  const recipeHasIngredients = ingredients?.some(
    (ingredient) => ingredient.recipe_id === +recipeId
  );

  const handleIngredientDelete = (e, ingredientId) => {
    e.preventDefault();

    dispatch(deleteIngredient(ingredientId, recipeId));
  };

  const handleIngredientEdit = (e, ingredientId, ingredientName, ingredientAmount) => {
    e.preventDefault();

    setName(ingredientName)
    setAmountUnit(ingredientAmount)
    setEditIngredientId(ingredientId)
    setHideAddForm(true)
    setHideEditForm(false)
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setName("");
    setAmountUnit(1);
    setEditIngredientId("");
    setHideAddForm(false);
    setHideEditForm(true);

  }

  const NextButton = () => {
    if (recipeHasIngredients) {
      return (
        <Link to={`/recipes/edit/${recipeId}/instructions`}>
          <button type="button">Next</button>
        </Link>
      )
    }
    return null;
  }

  if (!sessionUser) history.push("/");

  document.title = "Edit Recipe";

  return (
    <>
      <div className="edit-ingredients-page-container">
        <h1 className="edit-ingredients-page-title">
          Add or Edit Ingredients Below
        </h1>
        <div className="edit-recipe-ingredients-list">
          {ingredients?.map((ingredient) => (
            <p className="ingredient-item" key={ingredient.id}>
              {ingredient.amount_unit} {ingredient.name}
              <span
                className="ingredient-item-remove"
                onClick={(e) => {
                  handleIngredientDelete(e, ingredient.id);
                }}
              >
                X
              </span>
              <span
                className="ingredient-item-edit"
                onClick={(e) => {
                  handleIngredientEdit(
                    e,
                    ingredient.id,
                    ingredient.name,
                    ingredient.amount_unit
                  );
                }}
              >
                Edit
              </span>
            </p>
            // <div className="editable-ingredient">
            //   <input
            //     classname="editable-ingredient-name"
            //     type="text"
            //     value={ingredient.name}
            //     onChange={(e) => setEditIngredientName(e.target.value)}
            //   ></input>
            //   <input></input>
            //   <span></span>
            // </div>
          ))}
        </div>
        {/* <p className="edit-ingredients-title">Ingredients</p> */}
        <div className="edit-ingredients-body-container">
          <div
            className="edit-ingredients-form-container"
            id="ing-add"
            hidden={hideAddForm}
          >
            <form onSubmit={handleSubmit}>
              <label>Amount: </label>
              <input
                className="edit-ingredient-amount"
                type="number"
                step=".5"
                min=".25"
                max="100"
                name="ingredient-amount"
                onChange={(e) => {
                  setAmountUnit(e.target.value);
                }}
                value={amount_unit}
              ></input>
              <label>Ingredient Name: </label>
              <input
                className="edit-ingredient-name"
                type="text"
                pattern="^[a-zA-Z_.,!' ]+$"
                title="Ingredient names must only contain letters"
                name="ingredient-name"
                placeholder="Enter the name an ingredient here"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                required
              ></input>
              <div className="edit-form-buttons-container">
                <button className="edit-ingredients-submit-btn">
                  Add Ingredient
                </button>
              </div>
            </form>
          </div>
          <div
            className="edit-ingredients-form-container"
            id="ing-edit"
            hidden={hideEditForm}
          >
            <form onSubmit={handleEditSubmit}>
              <label>Amount: </label>
              <input
                className="edit-ingredient-amount"
                type="number"
                step=".5"
                min=".25"
                max="100"
                name="ingredient-amount"
                onChange={(e) => {
                  setAmountUnit(e.target.value);
                }}
                value={amount_unit}
              ></input>
              <label>Ingredient Name: </label>
              <input
                className="edit-ingredient-name"
                type="text"
                pattern="^[a-zA-Z_.,!' ]+$"
                title="Ingredient names must only contain letters"
                name="ingredient-name"
                placeholder="Enter the name an ingredient here"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                required
              ></input>
              <div className="edit-form-buttons-container">
                <button className="edit-ingredients-submit-btn">
                  Edit Ingredient
                </button>
                <button
                  className="edit-ingredients-cancel-edit-btn"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="edit-ingredients-buttons-container">
          <Link to={`/recipes/${recipeId}`}>
            <button className="edit-ingredients-cancel-btn" type="button">
              Cancel
            </button>
          </Link>
          <NextButton />
        </div>
      </div>
    </>
  );

};

export default EditRecipeIngredientsPage;
