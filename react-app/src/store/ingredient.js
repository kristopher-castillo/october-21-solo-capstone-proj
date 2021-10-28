const LOAD = 'ingredients/LOAD';
const ADD = "ingredients/ADD_INGREDIENT";
const UPDATE = "ingredients/UPDATE";

const load = ingredients => ({
  type: LOAD,
  ingredients
})

const addIngredientAction = ingredients => ({
  type: ADD,
  ingredients
})

const updateIngredientAction = ingredients => ({
  type: UPDATE,
  ingredients
})

export const getRecipeIngredients = (recipeId) => async dispatch => {
  const response = await fetch(`/api/recipes/${recipeId}/ingredients`)

  if (response.ok) {
    const ingredients = await response.json();
    dispatch(load(ingredients));
  } else {
    return ["An error occurred. Please try again."];
  }  
}

export const createIngredient = (ingredientData) => async (dispatch) => {
  const response = await fetch("/api/ingredients/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ingredientData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addIngredientAction(data));
    return data;
  }
};

export const updateIngredient = (ingredientData, ingredientId) => async (dispatch) => {
  const response = await fetch(`/api/ingredients/${ingredientId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ingredientData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateIngredientAction(data));
    return data;
  }
};

export const deleteIngredient = (ingredientId, recipeId) => async (dispatch) => {
  const response = await fetch(`/api/ingredients/${ingredientId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: recipeId
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

const initialState = { ingredients: null };

export default function ingredientsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD: {
      return { ingredients: action.ingredients };
    }
    case ADD: {
      return {
        newState,
        ingredients: action.ingredients,
      };
    }
    case UPDATE: {
      return {
        newState,
        ingredients: action.ingredients,
      };
    }
    default:
      return state;
  }
}