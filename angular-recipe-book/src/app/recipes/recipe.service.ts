import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
    'A super tasty schnitzel - just awesome!',
    'http://img.bestrecipes.com.au/RCK3slSo/h300-w400-cscale/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]
  ),
  new Recipe('A Big Fat Burger',
    'What else do we need to say?',
    'http://img.bestrecipes.com.au/RCK3slSo/h300-w400-cscale/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg',
    [
      new Ingredient('Buns', 2),
      new Ingredient('Meat', 2)
    ]
  )
  ];


  getRecipes() {
    return this.recipes.slice();
  }
}
