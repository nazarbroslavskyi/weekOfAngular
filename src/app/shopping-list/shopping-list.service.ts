import { Ingredient } from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientAdded = new Subject<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
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
}
