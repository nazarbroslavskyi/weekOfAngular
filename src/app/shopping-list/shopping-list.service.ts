import { Ingredient } from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(indexOfIngredient: number) {
    return this.ingredients[indexOfIngredient];
  }

  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    console.log(this.ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  onAddArrayOfIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    console.log(this.ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  onupdateIngredient(indexOfIngredient: number, newIngredient: Ingredient) {
    this.ingredients[indexOfIngredient] = newIngredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  onDeleteIngerdient(indexOfIngredient: number) {
    this.ingredients.splice(indexOfIngredient, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
