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
  )

  for key in seeders:
    db.session.add(seeders[key])

  db.session.commit()


def undo_instructions():
  db.session.execute('TRUNCATE instructions RESTART IDENTITY CASCADE;')
  db.session.commit()
