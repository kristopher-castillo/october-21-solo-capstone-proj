from flask import Blueprint, jsonify, session, request, redirect
from app.models import Note, db

note_routes = Blueprint('notes', __name__)
