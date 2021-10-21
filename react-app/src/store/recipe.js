const LOAD = 'recipes/LOAD';

const load = recipes => ({
  type: LOAD,
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

const initialState = { recipes: null }

export default function recipesReducer(state = initialState, action) {
  const newState = { ...state }
  switch (action.type) {
    case LOAD: {
      return {recipes: action.recipes}
    }
    default:
      return state;  
  }
}