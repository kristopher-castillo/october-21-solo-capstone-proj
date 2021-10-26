import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeNotes, createNote, updateNote } from "../../store/note";
import NotesButtons from "./NotesButtons";

import "./Notes.css"

const Notes = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [content, setContent] = useState("")
  const [editContent, setEditContent] = useState("")
  const [editNoteId, setEditNoteId] = useState("")
  const [hideContent, setHideContent] = useState(false)
  const [hideEdit, setHideEdit] = useState(true)
  const { recipeId } = useParams();
  const notes = useSelector((state) => state.notes?.notes?.recipe_notes)
  const users = useSelector((state) => state.users?.users?.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeNotes(recipeId))
  }, [dispatch, recipeId])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newNote = {
      content,
      recipe_id: recipeId
    }
    dispatch(createNote(newNote))
  }

  const handleNoteEdit = (e) => {
    e.preventDefault()

    const updatedNote = {
      content: editContent,
      recipe_id: recipeId
    }
    dispatch(updateNote(updatedNote, editNoteId))
  }

  return (
    <>
      <div className="notes-container">
        <h4>Notes Section</h4>
        <div className="new-note-box">
          <form className="note-form" onSubmit={handleSubmit}>
            <textarea
              className="new-note-text"
              rows="5"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              value={content}
              required
            ></textarea>
            <div className="note-submit-btn-container">
              <button className="note-submit-btn">Post Note</button>
            </div>
          </form>
        </div>
        <div className="notes-list-container">
          {notes?.map((note) => (
            <div className="notes-item" key={note?.id}>
              <div className="note-top-container">
                <div className="note-content" hidden={hideContent}>
                  {note?.content}
                </div>
                {note?.user_id === sessionUser.id ? (
                  <div className="edit-note-content" hidden={hideEdit}>
                    <form className="edit-note-form" onSubmit={handleNoteEdit}>
                      <textarea
                        className="edit-note-text"
                        rows="5"
                        onChange={(e) => {
                          setEditContent(e.target.value);
                          setEditNoteId(note?.id)
                        }}
                        placeholder={note?.content}
                        value={editContent}
                        required
                      ></textarea>
                      <button
                        type="submit"
                        onClick={() => {
                          setHideContent(false);
                          setHideEdit(true);
                        }}
                      >
                        Submit Edit
                      </button>
                    </form>
                  </div>
                ) : null}
                <div className="note-user">
                  {users?.find((user) => note?.user_id === user.id).username}
                </div>
              </div>
              <div className="note-btn-container">
                <NotesButtons
                  isNotesUser={note?.user_id === sessionUser.id}
                  deleteId={note?.id}
                  recipeId={recipeId}
                  hideContent={setHideContent}
                  hideEdit={setHideEdit}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Notes;