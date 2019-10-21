import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
  private selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://assets.blog.foodnetwork.ca/imageserve/wp-content/' +
      'uploads/sites/6/2016/02/Nori-Encrusted-Salmon-with-Soba-Noodles/x.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Fremch Fries', 20)
      ]),
    new Recipe('A Test another Recipe', 'This is simply another a test', 'https://www.inspiredtaste.net/wp-content/uploads' +
      '/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
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

}

