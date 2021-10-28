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

  const userHasNote = notes?.some(note => note.user_id === sessionUser?.id)

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
        <div className="notes-spacer"></div>
        <div className="notes-content-container">
          <h3 className="cooking-notes-label">Cooking Notes</h3>
          {!userHasNote && (
            <div className="new-note-box">
              <form className="note-form" onSubmit={handleSubmit}>
                
                <textarea
                  className="new-note-text"
                  rows="4"
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
          )}
          <hr className="notes-break"></hr>
          <div className="notes-list-container">
            {notes?.map((note) => (
              <div className="notes-item" key={note?.id}>
                <div className="note-top-container">
                  <div className="note-user">
                    {users?.find((user) => note?.user_id === user.id).username}
                  </div>
                  <div className="note-content" hidden={hideContent}>
                    {note?.content}
                  </div>
                  {note?.user_id === sessionUser?.id ? (
                    <div className="edit-note-content" hidden={hideEdit}>
                      <form
                        className="edit-note-form"
                        onSubmit={handleNoteEdit}
                      >
                        <textarea
                          className="edit-note-text"
                          rows="2"
                          onChange={(e) => {
                            setEditContent(e.target.value);
                            setEditNoteId(note?.id);
                          }}
                          value={editContent}
                          required
                        ></textarea>
                        <button
                          className="edit-submit-btn"
                          type="submit"
                          onClick={() => {
                            setHideContent(false);
                            setHideEdit(true);
                          }}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  ) : null}
                  
                </div>
                <div className="note-btn-container">
                  <NotesButtons
                    isNotesUser={note?.user_id === sessionUser?.id}
                    deleteId={note?.id}
                    recipeId={recipeId}
                    hideContent={setHideContent}
                    hideEdit={setHideEdit}
                    hideButtons={hideContent}
                    noteContent={note?.content}
                    editContent={setEditContent}
                  />
                </div>
                <hr className="single-note-break"></hr>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;