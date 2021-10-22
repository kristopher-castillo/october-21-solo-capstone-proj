from flask import Blueprint, jsonify, session, request, redirect
from app.models import Instructions, db
from flask_login import current_user, login_required
from app.forms import InstructionsForm

instructions_routes = Blueprint('instructions', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@instructions_routes.route('/', methods=['POST'])
@login_required
def new_instruction():
  """
  Creates a new instructions step.
  """

  form = InstructionsForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    new_instruction = Instructions(
      step=data["step"],
      content=data["content"],
      recipe_id=data["recipe_id"]
    )
    db.session.add(new_instruction)
    db.session.commit()
    return new_instruction.to_dict()
  else:
    print('INSTRUCTIONS FORM FAILED')
    return {'errors': validation_errors_to_error_messages(form.errors)}

@instructions_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_instruction(id):
  """
  Updates an instructions step by id.
  """
  updated_instruction = Instructions.query.filter(Instructions.id == id).first()
  form = InstructionsForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    updated_instruction.step=data["step"],
    updated_instruction.content=data["content"],
    updated_instruction.recipe_id=data["recipe_id"]
    db.session.commit()
    return updated_instruction.to_dict()
  else:
    print('INSTRUCTIONS FORM FAILED')
    return {'errors': validation_errors_to_error_messages(form.errors)}


@instructions_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_instruction(id):
  """
  Delete an instruction step by id.
  """

  instruction_to_delete = Instructions.query.filter(Instructions.id == id).first()
  db.session.delete(instruction_to_delete)
  db.session.commit()
  return {
      'deleted_instruction': instruction_to_delete.to_dict()
  }


