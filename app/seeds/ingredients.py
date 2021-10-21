from app.models import db, Ingredient


def seed_ingredients():
  seeders = dict(
    ingredient_1=Ingredient(
        name="unsalted butter, at room temperature"
    ),
    ingredient_2=Ingredient(
        name="white miso"
    ),
    ingredient_3=Ingredient(
        name="large garlic cloves, smashed"
    ),
    ingredient_4=Ingredient(
        name="butternut squash, peeled and cut into 1/2-inch cubes"
    ),
    ingredient_5=Ingredient(
        name="olive oil, plus more as needed"
    ),
    ingredient_6=Ingredient(
        name="mezze rigatoni or other short pasta"
    ),
    ingredient_7=Ingredient(
        name="grated Parmesan, plus more for serving"
    ),
      ingredient_8=Ingredient(
        name="lime, zested and juiced"
    ),
    ingredient_9=Ingredient(
        name="large sea scallops, patted dry"
    ),
    ingredient_10=Ingredient(
        name="grapeseed or canola oil, plus more as needed"
    ),
    ingredient_11=Ingredient(
        name="unsalted butter"
    ),
    ingredient_12=Ingredient(
        name="soy sauce"
    ),
    ingredient_13=Ingredient(
        name="garlic cloves, thinly sliced"
    ),
    ingredient_14=Ingredient(
        name="red-pepper flakes(optional)"
    ),
    ingredient_15=Ingredient(
        name="baby spinach or other tender greens"
    ),
    ingredient_16=Ingredient(
        name=" toasted sesame oil"
    ),
    ingredient_17=Ingredient(
        name="thinly sliced scallion greens"
    )
  )

  for key in seeders:
    db.session.add(seeders[key])

  db.session.commit()


def undo_ingredients():
  db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
  db.session.commit()
