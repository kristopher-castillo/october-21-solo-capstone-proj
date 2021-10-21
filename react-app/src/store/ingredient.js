const LOAD = 'ingredients/LOAD';

const load = ingredients => ({
  type: LOAD,
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

const initialState = { ingredients: null };

export default function ingredientsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD: {
      return { ingredients: action.ingredients };
    }
    default:
      return state;
  }
}