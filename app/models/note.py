from .db import db

class Note(db.Model):
  __tablename__ = 'notes'
  
  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.Text, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  recipe_id = db.Column(
      db.Integer, db.ForeignKey("recipes.id"), nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(
      db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  users = db.relationship("User", back_populates="notes")
  recipes = db.relationship("Recipe", back_populates="notes")

  def to_dict(self):
    return {
        'id': self.id,
        'content': self.content,
        'user_id': self.user_id,
        'recipe_id': self.recipe_id,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
