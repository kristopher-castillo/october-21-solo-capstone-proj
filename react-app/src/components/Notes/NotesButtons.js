import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../../store/note";

import "./Notes.css"

const NotesButtons = ({ isNotesUser, deleteId, recipeId, hideContent, hideEdit, hideButtons }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  if (sessionUser && isNotesUser) {
    return (
      <div className="edit-delete-container" hidden={hideButtons}>
        <button
          className="edit-button"
          type="button"
          
          onClick={() => {
            hideContent(true)
            hideEdit(false)
            // setHideButtons(true)
          }}
        >
          Edit
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={() => {
            dispatch(deleteNote(deleteId, recipeId))
            // setHideButtons(true)
          }}
        >
          Delete
        </button>
      </div>
    );
  }
  return null;
}

export default NotesButtons;