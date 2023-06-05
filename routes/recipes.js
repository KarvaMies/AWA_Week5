const express = require('express');
const router = express.Router();
const path = require('path');
const Recipe = require('../models/Recipe');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/recipes.html'));
});

router.get('/recipe', function(req, res, next) {
  res.send("You forgot the recipe from the URL.");
});

router.get("/recipe/:food", function(req, res) {
  Recipe.findOne({ name: req.params.food })
    .then(recipe => {
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ error: 'Recipe not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });
  /*
  recipe = {
    name: req.params.food,
    instructions: ["First do this.", "After this do that."],
    ingredients: ["ingredient#1", "ingredient#2", "ingredient#3", "ingredient#4", "ingredient#5"]
  };

  res.json(recipe);
  */
})

router.post('/recipe/', (req, res) => {
  const { name, instructions, ingredients } = req.body;

  const recipe = new Recipe({
    name,
    instructions,
    ingredients
  });

  recipe.save()
    .then(savedRecipe => {
      res.json(savedRecipe);
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error' });
    });

  //res.json(recipe);
});

module.exports = router;
