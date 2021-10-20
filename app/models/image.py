from .db import db

class Image(db.Model):
  __tablename__ = 'images'

  id = db.Column(db.Integer, primary_key=True)
  image_url = db.Column(db.String, nullable=False)
  recipe_id = db.Column(
      db.Integer, db.ForeignKey("recipes.id"), nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(
      db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  recipes = db.relationship("Recipe", back_populates="images")

  def to_dict(self):
    return {
        'id': self.id,
        'image_url': self.image_url,
        'recipe_id': self.recipe_id,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
