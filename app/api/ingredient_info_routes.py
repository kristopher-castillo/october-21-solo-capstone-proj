from flask import Blueprint, jsonify, session, request, redirect
from app.models import Ingredient_Info, db

ingredient_info_routes = Blueprint('ingredients_info', __name__)
