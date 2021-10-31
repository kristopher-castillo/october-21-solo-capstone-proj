from flask import Blueprint, jsonify, session, request, redirect
from app.models import Recipe, Ingredient, Instructions, Note, db
from flask_login import current_user, login_required
from app.forms import RecipeForm, RecipeEditForm


recipe_routes = Blueprint('recipes', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@recipe_routes.route('/')
def get_recipes():
  """
  Get all recipes
  """

  recipes = Recipe.query.all()
  return {
    'all_recipes': [recipe.to_dict() for recipe in recipes]
  }

@recipe_routes.route('/<int:id>')
def get_one_recipe(id):
  """
  Get one recipe based on id.
  """

  recipes = Recipe.query.filter(Recipe.id == id).first()
  return recipes.to_dict()

@recipe_routes.route('/', methods=['POST'])
@login_required
def new_recipe():
  """
  Creates a new recipe.
  """

  form = RecipeForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    new_recipe = Recipe(
      title=data['title'],
      description=data['description'],
      yield_amount=data['yield_amount'],
      completion_time=data['completion_time'],
      user_id=current_user.get_id()
    )
    db.session.add(new_recipe)
    db.session.commit()
    return new_recipe.to_dict()
  else:
    print('RECIPE FORM FAILED')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@recipe_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_recipe(id):
  """
  Updates recipe content.
  """

  updated_recipe = Recipe.query.filter(Recipe.id == id).first()
  form = RecipeEditForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    updated_recipe.title = data['title'],
    updated_recipe.description=data['description'],
    updated_recipe.yield_amount=data['yield_amount'],
    updated_recipe.completion_time=data['completion_time'],
    updated_recipe.user_id=updated_recipe.user_id
    db.session.commit()
    
    return updated_recipe.to_dict()
  else:
    print(updated_recipe.user_id)
    print('RECIPE UPDATE FORM FAILED')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@recipe_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_recipe(id):
  """
  Delete a recipe by id.
  """

  recipe_to_delete = Recipe.query.filter(Recipe.id == id).first()
  db.session.delete(recipe_to_delete)
  db.session.commit()

  recipes = Recipe.query.all()
  return {
      'all_recipes': [recipe.to_dict() for recipe in recipes]
  }

@recipe_routes.route('/<int:id>/ingredients')
def get_recipe_ingredients(id):
  """
  Get all ingredients associated with a specific id.
  """

  ingredients = Ingredient.query.filter(Ingredient.recipe_id == id).order_by(Ingredient.id.asc())
  
  return {
      'recipe_ingredients': [ingredient.to_dict() for ingredient in ingredients]
  }

@recipe_routes.route('/<int:id>/instructions')
def get_recipe_instructions(id):
  """
  Get all instructions associated with a specific id.
  """

  instructions = Instructions.query.filter(Instructions.recipe_id == id).order_by(Instructions.step.asc())
  
  return {
      'recipe_instructions': [instruction.to_dict() for instruction in instructions]
  }

@recipe_routes.route('/<int:id>/notes')
def get_recipe_notes(id):
  """
  Get all notes associated with a specific id.
  """

  notes = Note.query.filter(Note.recipe_id == id).order_by(Note.id.asc())
  
  return {
      'recipe_notes': [note.to_dict() for note in notes]
  }

