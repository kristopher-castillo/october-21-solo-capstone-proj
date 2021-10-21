const LOAD = "users/LOAD";

const load = (users) => ({
  type: LOAD,
  users,
});

export const getUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users/`);

  if (response.ok) {
    const users = await response.json();
    dispatch(load(users));
  } else {
    return ["An error occurred. Please try again."];
  }
};

const initialState = { users: null };

export default function usersReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD: {
      return { users: action.users };
    }
    default:
      return state;
  }
}
