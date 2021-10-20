from .db import db


class Recipe(db.Model):
  __tablename__ = 'recipes'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False, unique=True)
  description =db.Column(db.Text, nullable=False)
  yield_amount = db.Column(db.Integer, nullable=True)
  completion_time = db.Column(db.String, nullable=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  created_at = db.Column(db.DateTime, server_default=db.func.now())
  updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  users = db.relationship("User", back_populates="recipes")
  notes = db.relationship("Note", back_populates="recipes", cascade="all, delete")
  ingredients_info = db.relationship("Ingredients_Info", back_populates="recipes", cascade="all, delete")
  instructions = db.relationship("Instructions", back_populates="recipes", cascade="all, delete")
  images = db.relationship("Image", back_populates="recipes", cascade="all, delete")

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'description': self.description,
      'yield_amount': self.yield_amount,
      'completion_time': self.completion_time,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
