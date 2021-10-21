from app.models import db, Ingredient_Info


def seed_ingredients_info():
  seeders = dict(
    recipe_1_butter=Ingredient_Info(
        amount_unit=2,
        ingredient_id=1,
        recipe_id=1
    ),
    recipe_1_miso=Ingredient_Info(
        amount_unit=2,
        ingredient_id=2,
        recipe_id=1
    ),
    recipe_1_garlic=Ingredient_Info(
        amount_unit=3,
        ingredient_id=3,
        recipe_id=1
    ),
    recipe_1_squash=Ingredient_Info(
        amount_unit=2.5,
        ingredient_id=4,
        recipe_id=1
    ),
    recipe_1_oil=Ingredient_Info(
        amount_unit=1,
        ingredient_id=5,
        recipe_id=1
    ),
    recipe_1_pasta=Ingredient_Info(
        amount_unit=1,
        ingredient_id=6,
        recipe_id=1
    ),
    recipe_1_cheese=Ingredient_Info(
        amount_unit=0.5,
        ingredient_id=7,
        recipe_id=1
    ),
    recipe_1_lime=Ingredient_Info(
        amount_unit=1,
        ingredient_id=8,
        recipe_id=1
    )
  )

  for key in seeders:
    db.session.add(seeders[key])

  db.session.commit()

  
def undo_ingredients_info():
  db.session.execute('TRUNCATE ingredients_info RESTART IDENTITY CASCADE;')
  db.session.commit()
