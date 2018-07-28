import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();

  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice(); // returning a COPY of the ingredients array
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice()); // emitting a COPY of the ingredients array
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // adding the array with ingredients but with spread operator
    this.ingredientsChanged.next(this.ingredients.slice()); // emitting a COPY of the ingredients array
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
