from app.models import db, Note

def seed_notes():
  seeders = dict(
    note_1=Note(
      content="I'm definitely going to make this!",
      user_id=1,
      recipe_id=2
    ),
    note_2=Note(
      content="Not for me.",
      user_id=2,
      recipe_id=2
    ),
    note_3=Note(
      content="This is my favorite.",
      user_id=3,
      recipe_id=3
    ),
    note_4=Note(
      content="Can I use gluten-free flour?",
      user_id=3,
      recipe_id=1
    ),
    note_5=Note(
      content="I made this with vegan cheese and no salt and it tasted awful.",
      user_id=3,
      recipe_id=2
    )
  )

  for key in seeders:
    db.session.add(seeders[key])

  db.session.commit()


def undo_notes():
  db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
  db.session.commit()
