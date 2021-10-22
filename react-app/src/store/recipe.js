const LOAD = 'recipes/LOAD';
const ADD = 'recipes/ADD_RECIPE'
const UPDATE = "recipes/UPDATE";

const load = recipes => ({
  type: LOAD,
  recipes
})

const addRecipeAction = recipes => ({
  type: ADD,
  recipes
})

const updateRecipeAction = recipes => ({
  type: UPDATE,
  recipes
})

export const getRecipes = () => async dispatch => {
  const response = await fetch('/api/recipes/');

  if (response.ok) {
    const recipes = await response.json();
    dispatch(load(recipes))
  } else {
    return ["An error occurred. Please try again."];
  }
}

export const getOneRecipe = (recipeId) => async dispatch => {
  const response = await fetch(`/api/recipes/${recipeId}`)

  if (response.ok) {
    const recipe = await response.json();
    dispatch(load(recipe));
  } else {
    return ["An error occurred. Please try again."];
  }  
}

export const createRecipe = (recipeData) => async dispatch => {
  const response = await fetch("/api/recipes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeData)
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(addRecipeAction(data))
    return data;
  }
}

export const updateRecipe = (recipeData, recipeId) => async dispatch => {
  const response = await fetch(`/api/recipes/${recipeId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeData)
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(updateRecipeAction(data))
    return data;
  }
}

export const deleteRecipe = (recipeId) => async dispatch => {
  const response = await fetch(`/api/recipes/${recipeId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(load(data))
    return data;
  }
}

const initialState = { recipes: null }

export default function recipesReducer(state = initialState, action) {
  const newState = { ...state }
  switch (action.type) {
    case LOAD: {
      return {
        recipes: action.recipes
      }
    }
    case ADD: {
      return {
        newState,
        recipes: action.recipes
      }
    }
    case UPDATE: {
      return {
        newState,
        recipes: action.recipes
      }
    }
    default:
      return state;  
  }
}