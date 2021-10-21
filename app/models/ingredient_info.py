from .db import db


class Ingredient_Info(db.Model):
  __tablename__ = 'ingredients_info'

  id = db.Column(db.Integer, primary_key=True)
  amount_unit = db.Column(db.Float, nullable=False)
  ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredients.id"), nullable=False)
  recipe_id = db.Column(
      db.Integer, db.ForeignKey("recipes.id"), nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(
      db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  ingredients = db.relationship("Ingredient", back_populates="ingredients_info")
  recipes = db.relationship("Recipe", back_populates="ingredients_info")

  def to_dict(self):
    return {
        'id': self.id,
        'amount_unit': self.amount_unit,
        'ingredient_id': self.ingredient_id,
        'recipe_id': self.recipe_id,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
