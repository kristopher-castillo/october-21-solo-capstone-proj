from flask import Blueprint, jsonify, session, request, redirect
from flask_login import current_user, login_required
from app.models import Note, db
from app.forms import NoteForm

note_routes = Blueprint('notes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@note_routes.route('/')
def get_notes():
  """
  Get all notes
  """

  notes = Note.query.all()
  return {
      'all_notes': [note.to_dict() for note in notes]
  }

@note_routes.route('/<int:id>')
def get_one_note(id):
  """
  Get one note based on id.
  """

  notes = Note.query.filter(Note.id == id).first()
  return notes.to_dict()

@note_routes.route('/', methods=['POST'])
@login_required
def new_note():
  """
  Creates a new note.
  """
  form = NoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    new_note = Note(
      content=data['content'],
      user_id=current_user.get_id(),
      recipe_id=data['recipe_id']
    )
    db.session.add(new_note)
    db.session.commit()
    return new_note.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}

@note_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_note(id):
  """
  Updates a note by id.
  """
  updated_note = Note.query.filter(Note.id == id).first()
  form = NoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    updated_note.content = data['content'],
    updated_note.user_id = updated_note.user_id,
    updated_note.recipe_id = updated_note.recipe_id
    db.session.commit()
    return updated_note.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}

@note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
  """
  Deletes a note by id.
  """
  note_to_delete = Note.query.filter(Note.id == id).first()
  db.session.delete(note_to_delete)
  db.session.commit()
  return {
    'deleted_note': note_to_delete.to_dict()
  }
