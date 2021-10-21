from app.models import db, Instructions


def seed_instructions():
  seeders = dict(
    instruction_1=Instructions(
      step=1,
      content="Heat the oven to 450 degrees. On a sheet pan, mash together the butter and miso. Add the garlic and squash, drizzle with 1 tablespoon olive oil, and toss to coat with the miso-butter mixture. Sprinkle 1 teaspoon salt and season with pepper. Cook until easily pierced with a fork and the raw taste is gone, 25 to 30 minutes.",
      recipe_id=1
    ),
    instruction_2=Instructions(
      step=2,
      content="Meanwhile, bring a large pot of salted water to a boil. Add the pasta, adjusting the heat to maintain a gentle boil, and cook until just shy of al dente. Reserve 1 cup pasta water, then drain the noodles. If done before the squash, drizzle with olive oil to prevent the noodles from sticking together. Leave in the sink to drain.",
      recipe_id=1
    ),
    instruction_3=Instructions(
        step=3,
        content="When the squash is done, return the pasta to the pot over low heat. Scrape in squash, garlic and any liquid that accumulated, then add the Parmesan and 1/2 cup pasta water, stirring well until the noodles have a light sheen to them. If it appears dry, add more pasta water a tablespoon at a time until you reach your desired consistency. Stir in the lime zest and juice, season to taste with salt, and top with pepper and red-pepper flakes, if using. Serve with extra cheese.",
        recipe_id=1
    ),
    instruction_4=Instructions(
        step=1,
        content="Heat the oven to 200 degrees. Season the scallops well with salt and pepper. Heat a 12-inch cast-iron skillet over medium-high. Add 2 tablespoons grapeseed oil and, when it shimmers, add the scallops. Cook undisturbed for 2 to 3 minutes, until they begin to brown and form a crust on the bottom.",
        recipe_id=2
    ),
    instruction_5=Instructions(
        step=2,
        content="Flip the scallops, add the butter and soy sauce to the pan and use a spoon to repeatedly drizzle the sauce over the tops of the scallops to finish cooking, 1 to 2 minutes more.",
        recipe_id=2
    ),
    instruction_6=Instructions(
        step=3,
        content="Set the scallops on an oven-safe plate and pour the butter mixture on top. Place the plate in the oven to keep the scallops warm while you finish the rest of the dish.",
        recipe_id=2
    ),
    instruction_7=Instructions(
        step=4,
        content="Add the remaining 1 tablespoon grapeseed oil to the skillet and heat over medium. Add the garlic and red-pepper flakes, if using, and cook until the garlic is pale golden, about 2 minutes, adding a teaspoon or so more of grapeseed oil if needed. Return the heat to medium-high and add the spinach, in batches, if needed, and season with salt. Toss until the spinach wilts, adding a few teaspoons of water to help it along, if needed, and scrape the browned bits from the bottom of the pan. Turn off the heat.",
        recipe_id=2
    ),
    instruction_8=Instructions(
        step=5,
        content="Add the scallops back to the pan and pour any residual butter-sauce over top. Drizzle the dish with sesame oil and a good squeeze of lime. Top with scallions and sesame seeds, if using, and serve with rice.",
        recipe_id=2
    ),
    instruction_9=Instructions(
      step=1,
      content="If grilling, heat the grill. If griddling, heat your griddle or pan to medium.",
      recipe_id=3
    ),
    instruction_10=Instructions(
      step=2,
      content="Using a fork, mash strawberries with 1 tablespoon sugar until saucy with fine chunks.",
      recipe_id=3
    ),
    instruction_11=Instructions(
      step=3,
      content="On a cutting board, open buns, leaving them connected on one edge. Brush the cut, flat surfaces with the melted butter and sprinkle lightly with sugar.",
      recipe_id=3
    ),
    instruction_12=Instructions(
      step=4,
      content="Cook buns, buttered side up, until lightly toasted underneath, 1 to 2 minutes. Flip and toast the buttered sides until golden and the sugar caramelizes, imparting a nice sheen, 2 to 3 minutes. (You may need to rotate the buns to ensure even coloring and adjust heat lower, or move to a cooler spot if using a grill.) Transfer to a cutting board and let cool before assembling.",
      recipe_id=3
    ),
    instruction_13=Instructions(
      step=5,
      content="Drizzle open buns with a little Amaro, if using. Top each bottom half with a spoonful of strawberry mash, followed by a single scoop of ice cream, then another spoonful of strawberry mash. Close up sandwiches and serve immediately.",
      recipe_id=3
    ),
  )

  for key in seeders:
    db.session.add(seeders[key])

  db.session.commit()


def undo_instructions():
  db.session.execute('TRUNCATE instructions RESTART IDENTITY CASCADE;')
  db.session.commit()
