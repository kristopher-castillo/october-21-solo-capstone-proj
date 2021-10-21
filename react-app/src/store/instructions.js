const LOAD = "instructions/LOAD";

const load = (instructions) => ({
  type: LOAD,
  instructions
});

export const getRecipeInstructions = (recipeId) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${recipeId}/instructions`);

  if (response.ok) {
    const instructions = await response.json();
    dispatch(load(instructions));
  } else {
    return ["An error occurred. Please try again."];
  }
};

const initialState = { instructions: null };

export default function instructionsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD: {
      return { instructions: action.instructions };
    }
    default:
      return state;
  }
}
