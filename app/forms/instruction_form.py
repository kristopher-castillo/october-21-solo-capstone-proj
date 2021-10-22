from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired


class InstructionsForm(FlaskForm):
  step = IntegerField("step", validators=[DataRequired()])
  content = TextAreaField("content", validators=[DataRequired(
      "Please include instructions for this step of the recipe")])
  recipe_id = IntegerField("recipe_id", validators=[DataRequired()])
