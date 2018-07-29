import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor (private http: HttpClient,
               private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put('https://angular-recipe-book-482dc.firebaseio.com/recipe-book.json',
                   this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get('https://angular-recipe-book-482dc.firebaseio.com/recipe-book.json')
    .pipe(map(
        (recipes) => {
          for (const recipe in recipes) {
            if (!recipes[recipe]['ingredients']) {
              recipes[recipe]['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
    )
      .subscribe(
        (recipes: Recipe[]) => {
           this.recipeService.setRecipes(recipes);
        }
      );
  }
}
