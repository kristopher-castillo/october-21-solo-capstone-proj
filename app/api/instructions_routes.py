from flask import Blueprint, jsonify, session, request, redirect
from app.models import Instructions, db
from flask_login import current_user, login_required
from app.forms import InstructionsForm

instructions_routes = Blueprint('instructions', __name__)
