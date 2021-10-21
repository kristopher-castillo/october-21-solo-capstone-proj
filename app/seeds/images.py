from app.models import db, Image

def seed_images():
  image_1 = Image(
    image_url='https://static01.nyt.com/images/2021/10/13/dining/yf-miso-squash-pasta/merlin_195007083_8d48d736-c945-46f4-b78b-8ff76478e8aa-articleLarge.jpg',
    recipe_id=1
    )

  db.session.add(image_1)

  db.session.commit()

def undo_images():
  db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
  db.session.commit()
