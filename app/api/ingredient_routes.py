from flask import Blueprint, jsonify, session, request, redirect
from app.models import Ingredient, db
from flask_login import current_user, login_required
from app.forms import IngredientForm

ingredient_routes = Blueprint('ingredients', __name__)
