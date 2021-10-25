const LOAD = "notes/LOAD";
const ADD = "notes/ADD_NOTE";
const UPDATE = "notes/UPDATE";

const load = (notes) => ({
  type: LOAD,
  notes,
});

const addNoteAction = (notes) => ({
  type: ADD,
  notes,
});

const updateNoteAction = (notes) => ({
  type: UPDATE,
  notes,
});

export const getRecipeNotes = (recipeId) => async (dispatch) => {
  const response = await fetch(`/api/recipes/${recipeId}/notes`);

  if (response.ok) {
    const notes = await response.json();
    dispatch(load(notes));
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const createNote = (noteData) => async (dispatch) => {
  const response = await fetch("/api/notes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addNoteAction(data));
    return data;
  }
};

export const updateNote =
  (noteData, noteId) => async (dispatch) => {
    const response = await fetch(`/api/notes/${noteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noteData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateNoteAction(data));
      return data;
    }
  };

export const deleteNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

const initialState = { notes: null };

export default function notesReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD: {
      return { notes: action.notes };
    }
    case ADD: {
      return {
        newState,
        notes: action.notes,
      };
    }
    case UPDATE: {
      return {
        newState,
        notes: action.notes,
      };
    }
    default:
      return state;
  }
}
