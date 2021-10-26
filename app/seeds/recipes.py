from app.models import db, Recipe

def seed_recipes():
  seeders = dict(
    demo_recipe_1 = Recipe(
      title="Miso-Butter Pasta With Butternut Squash",
      description="A true love match, miso and butter create a simple yet deeply flavorful pasta that hits all the right notes: sweet, salty and savory. Smashed garlic cloves roast with the squash to gently flavor it, then become silky-soft treasures you’ll discover while eating. Finishing the dish with lime cuts through the richness of the butter, but you can use lemon, too. Try using other vegetables like eggplant, pumpkin or carrots to make this dish your own.",
      yield_amount=4,
      completion_time=35,
      user_id=1
    ),
    demo_recipe_2 = Recipe(
      title="Soy-Butter Basted Scallops With Wilted Greens and Sesame",
      description="This simple dish was inspired by a recipe for steamed scallop and butter rice found in “Donabe: Classic and Modern Japanese Clay Pot Cooking” (Ten Speed, 2015) by Naoko Takei Moore and Kyle Connaughton. Here, sweet sea scallops are seared in a hot pan and basted with melted butter and soy sauce to finish cooking. Tender greens are sautéed in garlic oil, then the scallops are placed on top and everything is drizzled with the remaining soy-butter and a bit of sesame oil. Finish the dish with a good squeeze of lime, thinly sliced scallions and a smattering of sesame seeds. It’s wonderful served over steamed white rice, so be sure to get that on the stove before you begin cooking the scallops, as the rest of the meal comes together in no time at all.",
      yield_amount=4,
      completion_time=30,
      user_id=2
    ),
    demo_recipe_3=Recipe(
      title="Strawberry and Ice Cream Sandwiches",
      description="This summertime snack is a spin on the Italian treat, brioche con gelato, which is typically served in hotter months for breakfast. This ice cream sandwich is made with actual bread — rather than cookies — landing this dessert in the not-too-sweet category. Griddling or grilling the buns with a butter-sugar finish adds a bit of caramelized sweetness. These are best eaten immediately, so have guests at the ready for assembling. The combination of still-warm bread, melting ice cream and strawberries is bliss.",
      yield_amount=4,
      completion_time=15,
      user_id=3
    ),
    demo_recipe_4=Recipe(
      title="Homemade Hamburger Helper",
      description="Think of this as the most luxurious Hamburger Helper you’ve ever had. It’s how Mark Rosati, the culinary director of Shake Shack, turns leftover ground beef into a complete weeknight dinner. The entire dish — even the pasta — is made in one pot, and melds the indelible comfort of macaroni and cheese with the complexity of a good Bolognese. This definitely has a kick, so adjust the hot sauce according to taste.",
      yield_amount=4,
      completion_time=60,
      user_id=1
    )
  )

  for key in seeders:
    db.session.add(seeders[key])

  db.session.commit()

def undo_recipes():
  db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
  db.session.commit()
