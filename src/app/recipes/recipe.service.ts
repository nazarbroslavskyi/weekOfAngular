import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Subject} from 'rxjs';
//
// @Injectable({
//   providedIn: 'root',
// })
export class RecipeService {
  private selectedRecipe = new EventEmitter<Recipe>();
  public recipesChanged = new Subject<Recipe[]>();

  public recipes: Recipe[] = [
    // new Recipe('A Test Recipe', 'This is simply a test', 'https://assets.blog.foodnetwork.ca/imageserve/wp-content/' +
    //   'uploads/sites/6/2016/02/Nori-Encrusted-Salmon-with-Soba-Noodles/x.jpg',
    //   [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('Fremch Fries', 20)
    //   ]),
    // new Recipe('A Test another Recipe', 'This is simply another a test', 'https://www.inspiredtaste.net/wp-content/uploads' +
    //   '/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg',
    //   [
    //     new Ingredient('Buns', 2),
    //     new Ingredient('Meat', 1)
    //   ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getSelectedRecipe() {
    return this.selectedRecipe;
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addNewRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    console.log(this.recipes);
    console.log(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipes(indexOfRecipe: number, udateRecipe: Recipe) {
    this.recipes[indexOfRecipe] = udateRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  public deleteRecipe(indexOfRecipe: number): void {
    this.recipes.splice(indexOfRecipe, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
