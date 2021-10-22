from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class RecipeForm(FlaskForm):
  title = StringField("title", validators=[DataRequired("Please include a title for your recipe.")])
  description = TextAreaField("description", validators=[DataRequired("Please add a description for your recipe.")])
  yield_amount = IntegerField("yield_amount")
  completion_time = StringField("completion_time")