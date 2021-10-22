const LOAD = "instructions/LOAD";
const ADD = "instructions/ADD_INSTRUCTIONS";
const UPDATE = "instructions/UPDATE";

const load = (instructions) => ({
  type: LOAD,
  instructions
});

const addInstructionsAction = (instructions) => ({
  type: ADD,
  instructions
});

const updateInstructionsAction = (instructions) => ({
  type: UPDATE,
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

export const createInstructions = (instructionsData) => async (dispatch) => {
  const response = await fetch("/api/instructions/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(instructionsData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addInstructionsAction(data));
    return data;
  }
};

export const updateInstructions = (instructionsData, instructionsId) => async (dispatch) => {
  const response = await fetch(`/api/instructions/${instructionsId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(instructionsData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateInstructionsAction(data));
    return data;
  }
};

export const deleteInstructions = (instructionsId) => async (dispatch) => {
  const response = await fetch(`/api/instructions/${instructionsId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

const initialState = { instructions: null };

export default function instructionsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD: {
      return { instructions: action.instructions };
    }
    case ADD: {
      return {
        newState,
        instructions: action.instructions,
      };
    }
    case UPDATE: {
      return {
        newState,
        instructions: action.instructions,
      };
    }
    default:
      return state;
  }
}
