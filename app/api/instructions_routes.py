from flask import Blueprint, jsonify, session, request, redirect
from app.models import Instructions, db

instructions_routes = Blueprint('instructions', __name__)
