from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired


class IngredientForm(FlaskForm):
  name = StringField("name", validators=[DataRequired("Please include a name for your ingredient.")])
  amount = DecimalField("amount", validators=[DataRequired("Please include an amount for your ingredient.")])
  
