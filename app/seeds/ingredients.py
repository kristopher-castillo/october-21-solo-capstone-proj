from app.models import db, Ingredient


def seed_ingredients():
  seeders = dict(
    ingredient_1=Ingredient(
        name="unsalted butter, at room temperature",
        amount_unit=2,
        recipe_id=1
    ),
    ingredient_2=Ingredient(
        name="white miso",
        amount_unit=2,
        recipe_id=1
    ),
    ingredient_3=Ingredient(
        name="large garlic cloves, smashed",
        amount_unit=3,
        recipe_id=1
    ),
    ingredient_4=Ingredient(
        name="butternut squash, peeled and cut into 1/2-inch cubes",
        amount_unit=2.5,
        recipe_id=1
    ),
    ingredient_5=Ingredient(
        name="olive oil, plus more as needed",
        amount_unit=1,
        recipe_id=1
    ),
    ingredient_6=Ingredient(
        name="mezze rigatoni or other short pasta",
        amount_unit=1,
        recipe_id=1
    ),
    ingredient_7=Ingredient(
        name="grated Parmesan, plus more for serving",
        amount_unit=0.5,
        recipe_id=1
    ),
      ingredient_8=Ingredient(
        name="lime, zested and juiced",
        amount_unit=1,
        recipe_id=1
    ),
    ingredient_9=Ingredient(
        name="large sea scallops, patted dry",
        amount_unit=1,
        recipe_id=2
    ),
    ingredient_10=Ingredient(
        name="grapeseed or canola oil, plus more as needed",
        amount_unit=3,
        recipe_id=2
    ),
    ingredient_11=Ingredient(
        name="unsalted butter",
        amount_unit=2,
        recipe_id=2
    ),
    ingredient_12=Ingredient(
        name="soy sauce",
        amount_unit=2,
        recipe_id=2
    ),
    ingredient_13=Ingredient(
        name="garlic cloves, thinly sliced",
        amount_unit=3,
        recipe_id=2
    ),
    ingredient_14=Ingredient(
        name="red-pepper flakes(optional)",
        amount_unit=0.5,
        recipe_id=2
    ),
    ingredient_15=Ingredient(
        name="baby spinach or other tender greens",
        amount_unit=1.5,
        recipe_id=2
    ),
    ingredient_16=Ingredient(
        name=" toasted sesame oil",
        amount_unit=1,
        recipe_id=2
    ),
    ingredient_17=Ingredient(
        name="thinly sliced scallion greens",
        amount_unit=2,
        recipe_id=2
    )
  )

  for key in seeders:
    db.session.add(seeders[key])

  db.session.commit()


def undo_ingredients():
  db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
  db.session.commit()
