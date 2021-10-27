import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../../store/note";

import "./Notes.css"

const NotesButtons = ({isNotesUser, deleteId, recipeId, hideContent, hideEdit}) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  if (sessionUser && isNotesUser) {
    return (
      <div className="edit-delete-container">
        <button
          className="edit-button"
          type="button"
          onClick={() => {
            hideContent(true)
            hideEdit(false)
          }}
        >
          Edit Note
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={() => {
            dispatch(deleteNote(deleteId, recipeId))
          }}
        >
          Delete Note
        </button>
      </div>
    );
  }
  return null;
}

export default NotesButtons;