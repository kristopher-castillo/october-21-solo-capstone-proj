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
    instruction_14=Instructions(
      step=1,
      content="Heat a large (12-inch) sauté pan or Dutch oven over medium-low heat, and add oil and onion; season lightly with salt and pepper. (The hot sauce added in Step 6 will add a lot of flavor, so be careful not to overseason here.) Let cook until the onions turn light beige in color and begin to caramelize, 20 to 25 minutes.",
      recipe_id=4
    ),
    instruction_15=Instructions(
      step=2,
      content="Add garlic, and cook until fragrant and starting to brown ever so slightly, about 2 minutes.",
      recipe_id=4
    ),
    instruction_16=Instructions(
      step=3,
      content="Increase heat to medium-high and add bacon and ground beef, using the back of a large spoon to break up the meat into smaller pieces. Continue to cook until the liquid has mostly evaporated and the meat starts to sear and develop a crust on the bottom of the pan, 12 to 15 minutes.",
      recipe_id=4
    ),
    instruction_17=Instructions(
      step=4,
      content="Remove pan from the heat and carefully drain off most of the fat, leaving a little in the pan to keep the meat moist.",
      recipe_id=4
    ),
    instruction_18=Instructions(
      step=5,
      content="Return pan to the medium-high heat and add white wine, allowing it to reduce until the mixture is almost dry, about 10 minutes.",
      recipe_id=4
    ),
    instruction_19=Instructions(
      step=6,
      content="Add the chicken stock, heavy cream, hot sauce, paprika and bay leaf to the pan. Mix until combined and bring to a boil over medium-high.",
      recipe_id=4
    ),
    instruction_20=Instructions(
      step=7,
      content="Once the mixture is boiling, add the pasta and cook until al dente, stirring often, about 9 minutes.",
      recipe_id=4
    ),
    instruction_21=Instructions(
      step=8,
      content="Reduce the heat to low and stir in both types of cheese, stirring until completely melted and sauce is thickened.",
      recipe_id=4
    ),
    instruction_22=Instructions(
      step=9,
      content="Remove the pan from heat, stir in chives and season to taste with salt and pepper. Serve immediately.",
      recipe_id=4
    ),
  )

  for key in seeders:
    db.session.add(seeders[key])

  db.session.commit()


def undo_instructions():
  db.session.execute('TRUNCATE instructions RESTART IDENTITY CASCADE;')
  db.session.commit()
