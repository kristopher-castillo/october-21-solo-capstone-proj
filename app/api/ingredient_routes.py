from flask import Blueprint, jsonify, session, request, redirect
from app.models import Ingredient, db

ingredient_routes = Blueprint('ingredients', __name__)
