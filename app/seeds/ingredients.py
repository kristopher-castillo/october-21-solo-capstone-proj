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
    ),
    ingredient_18=Ingredient(
        name="strawberries, washed, hulled and roughly chopped",
        amount_unit=12,
        recipe_id=3
    ),
    ingredient_19=Ingredient(
        name="granulated sugar, plus more for sprinkling",
        amount_unit=1,
        recipe_id=3
    ),
    ingredient_20=Ingredient(
        name="slider buns or dinner rolls, preferably brioche (see Tip)",
        amount_unit=4,
        recipe_id=3
    ),
    ingredient_21=Ingredient(
        name="salted butter, melted",
        amount_unit=0.25,
        recipe_id=3
    ),
    ingredient_22=Ingredient(
        name="vanilla or strawberry ice cream",
        amount_unit=1,
        recipe_id=3
    ),
    ingredient_23=Ingredient(
        name="neutral oil",
        amount_unit=.25,
        recipe_id=4
    ),
    ingredient_24=Ingredient(
        name="large yellow onion",
        amount_unit=1,
        recipe_id=4
    ),
    ingredient_25=Ingredient(
        name="salt",
        amount_unit=1,
        recipe_id=4
    ),
    ingredient_26=Ingredient(
        name="garlic cloves, minced",
        amount_unit=3,
        recipe_id=4
    ),
    ingredient_27=Ingredient(
        name="strips bacon",
        amount_unit=5,
        recipe_id=4
    ),
    ingredient_28=Ingredient(
        name="ground beef",
        amount_unit=1,
        recipe_id=4
    ),
    ingredient_29=Ingredient(
        name="dry white wine",
        amount_unit=1,
        recipe_id=4
    ),
    ingredient_30=Ingredient(
        name="chicken stock or water",
        amount_unit=3,
        recipe_id=4
    ),
    ingredient_31=Ingredient(
        name="heavy cream",
        amount_unit=.75,
        recipe_id=4
    ),
    ingredient_32=Ingredient(
        name="hot sauce",
        amount_unit=.25,
        recipe_id=4
    ),
    ingredient_33=Ingredient(
        name="hot smoked paprika",
        amount_unit=2,
        recipe_id=4
    ),
    ingredient_34=Ingredient(
        name="bay leaf",
        amount_unit=1,
        recipe_id=4
    ),
    ingredient_35=Ingredient(
        name="elbow pasta",
        amount_unit=8,
        recipe_id=4
    ),
    ingredient_36=Ingredient(
        name="American cheese",
        amount_unit=5,
        recipe_id=4
    ),
    ingredient_37=Ingredient(
        name="grated cheddar",
        amount_unit=1.5,
        recipe_id=4
    ),
    ingredient_38=Ingredient(
        name="finely chopped chives",
        amount_unit=.5,
        recipe_id=4
    ),
  )

  for key in seeders:
    db.session.add(seeders[key])

  db.session.commit()


def undo_ingredients():
  db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
  db.session.commit()
