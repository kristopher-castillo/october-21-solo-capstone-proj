from flask import Blueprint, jsonify, session, request, redirect, render_template
from app.models import Image, db
from flask_login import current_user, login_required
from werkzeug.utils import secure_filename
from app.forms import ImageForm

import boto3
import os

s3 = boto3.client('s3',
                  aws_access_key_id=os.environ.get("S3_ACCESS_KEY"),
                  aws_secret_access_key=os.environ.get("S3_SECRET_KEY")
                  )
BUCKET_NAME = os.environ.get("S3_BUCKET_NAME")


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

    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        img = request.files['image']
        if img:
            filename = secure_filename(img.filename)
            img.save(filename)
            s3.upload_file(
                Bucket = BUCKET_NAME,
                Filename=filename,
                Key = filename
            )
            url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{filename}"

            new_image = Image(
                image_url=url,
                recipe_id=request.form["recipe_id"]
            )
            db.session.add(new_image)
            db.session.commit()
            return new_image.to_dict()
        else:
            print('IMAGE FORM FAILED')
            return {'errors': validation_errors_to_error_messages(form.errors)}

@image_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_image(id):
    """
    Updates an image by id.
    """

    updated_image = Image.query.filter(Image.id == id).first()
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        img = request.files['image']
        if img:
            filename = secure_filename(img.filename)
            img.save(filename)
            s3.upload_file(
                Bucket=BUCKET_NAME,
                Filename=filename,
                Key=filename
            )
            url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{filename}"

            updated_image.image_url=url
            updated_image.recipe_id = request.form["recipe_id"]
            db.session.commit()
            return updated_image.to_dict()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}

@image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_image(id):
    """
    Deletes an image by id
    """
    image_to_delete = Image.query.filter(Image.id == id).first()
    db.session.delete(image_to_delete)
    db.session.commit()
    return {
        'deleted_image': image_to_delete.to_dict()
    }
