import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getRecipeNotes } from "../../store/note";

import "./Notes.css"

const Notes = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { recipeId } = useParams();
  const notes = useSelector((state) => state.notes?.notes?.recipe_notes)
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeNotes(recipeId))
  }, [dispatch, recipeId])

  return (
    <>
      <div className="notes-container">
        <h1>Notes Section</h1>
        <div className="new-note-box">
          <form className="note-form">
            <textarea
              className="new-note-text"
              rows="5"
              required
            >
            </textarea>
            <div className="note-submit-btn">
              Post Note
            </div>
          </form>
        </div>
        {notes?.map((note) => (
          <div className="notes-list-container">
            
          </div>   
        ))}
      </div>
    </>
  )
}

export default Notes;