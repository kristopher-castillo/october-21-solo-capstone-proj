from flask import Blueprint, jsonify, session, request, redirect
from app.models import Image, db

image_routes = Blueprint('images', __name__)
