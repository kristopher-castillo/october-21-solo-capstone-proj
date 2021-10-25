from flask.cli import AppGroup

from app.seeds.notes import seed_notes, undo_notes
from .users import seed_users, undo_users
from .recipes import seed_recipes, undo_recipes
from .images import seed_images, undo_images
# from .ingredients_info import seed_ingredients_info, undo_ingredients_info
from .ingredients import seed_ingredients, undo_ingredients
from .instructions import seed_instructions, undo_instructions

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_recipes()
    seed_images()
    seed_instructions()
    seed_ingredients()
    seed_notes()
    # seed_ingredients_info()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_recipes()
    undo_images()
    undo_instructions()
    undo_ingredients()
    undo_notes()
    # undo_ingredients_info()

    # Add other undo functions here
