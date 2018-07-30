import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor (private http: HttpClient,
               private recipeService: RecipeService,
               private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://angular-recipe-book-482dc.firebaseio.com/recipe-book.json?auth=' + token,
                   this.recipeService.getRecipes());
  }

  getRecipes() {
   const token = this.authService.getToken();
    this.http.get('https://angular-recipe-book-482dc.firebaseio.com/recipe-book.json?auth=' + token)
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
