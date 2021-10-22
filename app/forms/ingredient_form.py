from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired


class IngredientForm(FlaskForm):
  name = StringField("name", validators=[DataRequired("Please include a name for your ingredient.")])
  amount_unit = DecimalField("amount_unit", validators=[DataRequired("Please include an amount for your ingredient.")])
  recipe_id = IntegerField("recipe_id", validators=[DataRequired()])
