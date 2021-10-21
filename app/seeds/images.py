from app.models import db, Image

def seed_images():
  seeders = dict(
    image_1 = Image(
      image_url='https://static01.nyt.com/images/2021/10/13/dining/yf-miso-squash-pasta/merlin_195007083_8d48d736-c945-46f4-b78b-8ff76478e8aa-articleLarge.jpg',
      recipe_id=1
    ),
    image_2 = Image(
      image_url='https://static01.nyt.com/images/2020/08/19/dining/ch-scallops-greens/merlin_174651789_59eb6831-2929-442e-a44f-212234527fc9-articleLarge.jpg',
      recipe_id=2
    ),
    image_3=Image(
      image_url='https://static01.nyt.com/images/2021/06/21/dining/lep-strawberry-ice-cream-sandwiches/merlin_188069937_308af533-e491-4515-a7eb-7a9ea116a031-articleLarge.jpg',
      recipe_id=3
    )
  )

  for key in seeders:
    db.session.add(seeders[key])

  db.session.commit()

def undo_images():
  db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
  db.session.commit()
