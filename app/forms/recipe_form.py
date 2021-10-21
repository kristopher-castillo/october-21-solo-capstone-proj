from typing import Text
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class RecipeForm(FlaskForm):
  title = StringField("Title", validators=[DataRequired()])
  description = TextAreaField("Description", validators=[DataRequired()])
  yield_amount = IntegerField("Yield")
  completion_time = StringField("Completion Time")