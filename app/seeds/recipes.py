from app.models import db, Recipe

def seed_recipes():
  demo_recipe_1 = Recipe(
    title="Miso-Butter Pasta With Butternut Squash",
    description="A true love match, miso and butter create a simple yet deeply flavorful pasta that hits all the right notes: sweet, salty and savory. Smashed garlic cloves roast with the squash to gently flavor it, then become silky-soft treasures you’ll discover while eating. Finishing the dish with lime cuts through the richness of the butter, but you can use lemon, too. Try using other vegetables like eggplant, pumpkin or carrots to make this dish your own.",
    yield_amount=4,
    completion_time=35,
    user_id=1
    )

  db.session.add(demo_recipe_1)

  db.session.commit()

def undo_recipes():
  db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
  db.session.commit()
