let ingredientList = [];
let instructionList = [];

document.getElementById('add-ingredient').addEventListener('click', () => {
    let ingredient = document.getElementById('ingredients-text').value;
    console.log(ingredient);
    ingredientList.push(ingredient);
    document.getElementById('ingredients-text').value = '';
})

document.getElementById('add-instruction').addEventListener('click', () => {
    let instruction = document.getElementById('instructions-text').value;
    console.log(instruction);
    instructionList.push(instruction);
    document.getElementById('instructions-text').value = '';
})


document.getElementById('submit').addEventListener('click', () => {
    let name = document.getElementById('name-text').value;
    let recipe = {
      name: name,
      instructions: instructionList,
      ingredients: ingredientList
    };
  
    fetch('/recipe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipe)
    })
    .then(response => response.json())
    .then(recipe => {
      console.log(recipe);
    })
    .catch(error => {
      console.error(error);
    });
  });

document.getElementById('search-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    let name = document.getElementById('search-input').value;
    fetch(`/recipe/${name}`)
    .then(response => { 
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Recipe not found lmao');
      }
    })
    .then(recipe => {
      updateRecipeView(recipe);
    })
    .catch(error => {
      console.log(`Recipe for '${name}' not found`);
      updateRecipeView(null);
    });
  }
});

function updateRecipeView(recipe) {
  document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here
    let recipeContainer = document.getElementById("container");
    recipeContainer.innerHTML = '';

    if (recipe) {
      var recipeName = document.createElement("h2");
      recipeName.innerText = recipe.name;

      var instructionsHeading = document.createElement("h3");
      instructionsHeading.innerText = "Instructions:";

      var instructionsList = document.createElement("ul");
      recipe.instructions.forEach(function(instruction) {
        var li = document.createElement("li");
        li.innerText = instruction;
        instructionsList.appendChild(li);
      });

      var ingredientsHeading = document.createElement("h3");
      ingredientsHeading.innerText = "Ingredients:";

      var ingredientsList = document.createElement("ul");
      recipe.ingredients.forEach(function(ingredient) {
        var li = document.createElement("li");
        li.innerText = ingredient;
        ingredientsList.appendChild(li);
      });

    
      recipeContainer.appendChild(recipeName);
      recipeContainer.appendChild(instructionsHeading);
      recipeContainer.appendChild(instructionsList);
      recipeContainer.appendChild(ingredientsHeading);
      recipeContainer.appendChild(ingredientsList);
    } else {
      let notFound = document.createElement("p");
      notFound.innerText = "Recipe not found";
      recipeContainer.append(notFound);
    }
  });
  
  
}