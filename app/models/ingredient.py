from .db import db


class Ingredient(db.Model):
  __tablename__ = 'ingredients'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  amount_unit = db.Column(db.Float, nullable=False)
  recipe_id = db.Column(
      db.Integer, db.ForeignKey("recipes.id"), nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(
      db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  recipes = db.relationship("Recipe", back_populates="ingredients")


  def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'amount_unit': self.amount_unit,
        'recipe_id': self.recipe_id,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
