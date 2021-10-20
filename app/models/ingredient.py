from .db import db


class Ingredient(db.Model):
  __tablename__ = 'ingredients'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(
      db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  ingredients_info = db.relationship("Ingredients_Info", back_populates="ingredients", cascade="all, delete")


  def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
