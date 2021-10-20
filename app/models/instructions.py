from .db import db


class Instructions(db.Model):
  __tablename__ = 'instructions'

  id = db.Column(db.Integer, primary_key=True)
  step = db.Column(db.Integer, nullable=False)
  content = db.Column(db.Text, nullable=False)
  recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(
      db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  recipes = db.relationship("Recipe", back_populates="instructions")

  def to_dict(self):
    return {
        'id': self.id,
        'step': self.step,
        'content': self.content,
        'recipe_id': self.recipe_id,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
