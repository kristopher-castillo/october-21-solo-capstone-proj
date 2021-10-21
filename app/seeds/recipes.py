from app.models import db, Recipe

def seed_recipes():
  demo_recipe_1 = Recipe(
    title="Miso-Butter Pasta With Butternut Squash",
    description="A true love match, miso and butter create a simple yet deeply flavorful pasta that hits all the right notes: sweet, salty and savory. Smashed garlic cloves roast with the squash to gently flavor it, then become silky-soft treasures you’ll discover while eating. Finishing the dish with lime cuts through the richness of the butter, but you can use lemon, too. Try using other vegetables like eggplant, pumpkin or carrots to make this dish your own.",
    yield_amount=4,
    completion_time=35,
    user_id=1
    )
  demo_recipe_2 = Recipe(
    title="Soy-Butter Basted Scallops With Wilted Greens and Sesame",
    description="This simple dish was inspired by a recipe for steamed scallop and butter rice found in “Donabe: Classic and Modern Japanese Clay Pot Cooking” (Ten Speed, 2015) by Naoko Takei Moore and Kyle Connaughton. Here, sweet sea scallops are seared in a hot pan and basted with melted butter and soy sauce to finish cooking. Tender greens are sautéed in garlic oil, then the scallops are placed on top and everything is drizzled with the remaining soy-butter and a bit of sesame oil. Finish the dish with a good squeeze of lime, thinly sliced scallions and a smattering of sesame seeds. It’s wonderful served over steamed white rice, so be sure to get that on the stove before you begin cooking the scallops, as the rest of the meal comes together in no time at all.",
    yield_amount=4,
    completion_time=30,
    user_id=2
    )

  db.session.add(demo_recipe_1)
  db.session.add(demo_recipe_2)

  db.session.commit()

def undo_recipes():
  db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
  db.session.commit()
