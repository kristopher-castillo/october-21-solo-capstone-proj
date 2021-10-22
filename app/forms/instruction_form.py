from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired


class InstructionsForm(FlaskForm):
  content = TextAreaField("content", validators=[DataRequired(
      "Please include instructions for this step of the recipe")])
