const LOAD = "images/LOAD";
const ADD = "images/ADD_IMAGE";
const UPDATE = "images/UPDATE";

const load = (images) => ({
  type: LOAD,
  images
});

const addImageAction = (images) => ({
  type: ADD,
  images
});

const updateImageAction = (images) => ({
  type: UPDATE,
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

export const createImage = (imageData) => async (dispatch) => {
  const response = await fetch("/api/images/", {
    method: "POST",
    body: imageData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addImageAction(data));
    return data;
  }
};

export const updateImage = (imageData, imageId) => async (dispatch) => {
  const response = await fetch(`/api/images/${imageId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imageData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateImageAction(data));
    return data;
  }
};

export const deleteImage = (imageId) => async (dispatch) => {
  const response = await fetch(`/api/images/${imageId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

const initialState = { images: null };

export default function imagesReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOAD: {
      return { images: action.images };
    }
    case ADD: {
      return {
        newState,
        images: action.images,
      };
    }
    case UPDATE: {
      return {
        newState,
        images: action.images,
      };
    }
    default:
      return state;
  }
}
