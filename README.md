
# PA Times Cooking

Developed by Kristopher C. Castillo

PA Times Cooking is a clone of NYT Cooking and allows registered users to view, create, share, and discuss recipes.

Users are able register for their own accounts, allowing them to view all recipes on the site. Users who are not logged in are able to browse recipe images and titles, but accessing recipe content is restricted to logged in users.

Registered users may also share their own favorite recipes, including ingredients, preparation steps, and an eye-catching image. These users are then able to edit and delete the uploaded recipe, if they so choose.

The process of sharing recipes is inherently social and only improved when cooks share their results, opinions, and tweaks after trying the recipe out. Therefore, logged-users can add recipe notes on each recipe page.

I hope you enjoy this site and take away some inspiration for tonight's dinner!

## Link to live PA Times Cooking site on Heroku

http://cooking-patimes.herokuapp.com/

## Link to wiki docs

https://github.com/kristopher-castillo/october-21-solo-capstone-proj

## Discussion of technologies used

I was able to utilize a wide variety of technologies in this project. In the back end, the site relies on Flask-SQLAlchemy to manage its database of ingredients, instructions, images, and other recipe info. Flask was used to build and implement interconnected routes and WTForms provided seamless backend validations to forms. 
When designing the front end, I relied on React's powerful HTML syntax along with CSS to create a functional and attractive app. Te site also leverages Amazon S3 to manage storage and hosting of user uploaded images. These technologies were enhanced by the use of Redux to manage and manipulate  state, producing a dynamic final product. The site is hosted on Heroku to provide you with a simple way to experience the site's features.


