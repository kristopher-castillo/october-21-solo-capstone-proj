from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired

class NoteForm(FlaskForm):
  content = TextAreaField("content", validators=[DataRequired("Please add text to your comment.")])
  recipe_id = IntegerField("recipe_id", validators=[DataRequired()])
