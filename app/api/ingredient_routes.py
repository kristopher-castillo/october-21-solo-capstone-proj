from flask import Blueprint, jsonify, session, request, redirect
from app.models import Ingredient, db, ingredient
from flask_login import current_user, login_required
from app.forms import IngredientForm

ingredient_routes = Blueprint('ingredients', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@ingredient_routes.route('/', methods=['POST'])
@login_required
def new_ingredient():
  """
  Creates a new ingredient.
  """

  form = IngredientForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    new_ingredient = Ingredient(
      name=data["name"],
      amount_unit=data["amount_unit"],
      recipe_id=data["recipe_id"]
    )
    db.session.add(new_ingredient)
    db.session.commit()

    ingredients = Ingredient.query.filter(Ingredient.recipe_id == data['recipe_id'])
    return {
        'recipe_ingredients': [ingredient.to_dict() for ingredient in ingredients]
    }
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}

@ingredient_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_ingredient(id):
  """
  Updates an ingredient by id.
  """
  updated_ingredient = Ingredient.query.filter(Ingredient.id == id).first()
  form = IngredientForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    data = form.data
    updated_ingredient.name=data["name"],
    updated_ingredient.amount_unit=data["amount_unit"],
    updated_ingredient.recipe_id=data["recipe_id"]
    db.session.commit()

    ingredients = Ingredient.query.filter(
        Ingredient.recipe_id == updated_ingredient.recipe_id)
    return {
        'recipe_ingredients': [ingredient.to_dict() for ingredient in ingredients]
    }
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}


@ingredient_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_ingredient(id):
  """
  Delete an ingredient by id.
  """

  recipe_id = int(request.data.decode("utf-8"))
  ingredient_to_delete = Ingredient.query.filter(Ingredient.id == id).first()
  db.session.delete(ingredient_to_delete)
  db.session.commit()
  
  ingredients = Ingredient.query.filter(Ingredient.recipe_id == recipe_id)
  return {
      'recipe_ingredients': [ingredient.to_dict() for ingredient in ingredients]
  }
