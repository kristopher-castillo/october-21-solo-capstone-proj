from flask import Blueprint, jsonify, session, request, redirect
from app.models import Image, db
from flask_login import current_user, login_required
from app.forms import ImageForm

image_routes = Blueprint('images', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@image_routes.route('/')
def get_images():
  """
  Get all images
  """

  images = Image.query.all()
  return {
      'all_images': [image.to_dict() for image in images]
  }

@image_routes.route('/', methods=['POST'])
@login_required
def new_image():
    """
    Creates a new image.
    """

