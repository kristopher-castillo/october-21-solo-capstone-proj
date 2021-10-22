from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired


class ImageForm(FlaskForm):
  image_url = StringField("image_url", validators=[DataRequired("Please include an image of your recipe")])
  recipe_id = IntegerField("recipe_id", validators=[DataRequired()])

