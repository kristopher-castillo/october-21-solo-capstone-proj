from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Recipe


def recipe_title_exists(form, field):
    # Checking if title is already in use
    title = field.data
    recipe = Recipe.query.filter(Recipe.title == title).first()
    if recipe:
        raise ValidationError('A recipe with that title already exists. Please choose another one!')

class RecipeForm(FlaskForm):
  title = StringField("title", validators=[DataRequired("Please include a title for your recipe."), recipe_title_exists])
  description = TextAreaField("description", validators=[DataRequired("Please add a description for your recipe.")])
  yield_amount = IntegerField("yield_amount")
  completion_time = StringField("completion_time")
