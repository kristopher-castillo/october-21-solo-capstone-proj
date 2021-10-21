from flask import Blueprint, jsonify, session, request, redirect
from app.models import Recipe, db
from flask_login import current_user, login_required
from app.forms import RecipeForm


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
    return {'errors': validation_errors_to_error_messages(form.errors)}


@recipe_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_recipe():
  """
  Updates recipe content.
  """

  recipe = Recipe.query.filter(Recipe.id == id).first()
  form = RecipeForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit() & current_user.get_id() == recipe.user_id:
    data = form.data
    recipe.title = data['title'],
    recipe.description=data['description'],
    recipe.yield_amount=data['yield_amount'],
    recipe.completion_time=data['completion_time'],
    recipe.user_id=recipe.user_id
    db.session.commit()
    return recipe.to_dict()
  else:
    print('RECIPE UPDATE FORM FAILED')
    return {'errors': validation_errors_to_error_messages(form.errors)}


@recipe_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_recipe():
  recipe_to_delete = Recipe.query.filter(Recipe.id == id).first()
  if current_user.get_id() == recipe_to_delete.user_id:
    db.session.delete(recipe_to_delete)
    db.session.commit()
    return {
      'deleted_recipe': recipe_to_delete.to_dict()
    }
  