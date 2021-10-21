const LOAD = "images/LOAD";

const load = (images) => ({
  type: LOAD,
  images
});

export const getImages = () => async (dispatch) => {
  const response = await fetch("/api/images/");

  if (response.ok) {
    const images = await response.json();
    dispatch(load(images));
  } else {
    return ["An error occurred. Please try again."];
  }
};

const initialState = { images: null };

export default function imagesReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD: {
      return { images: action.images };
    }
    default:
      return state;
  }
}
