import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model'
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://assets.blog.foodnetwork.ca/imageserve/wp-content/' +
      'uploads/sites/6/2016/02/Nori-Encrusted-Salmon-with-Soba-Noodles/x.jpg'),
    new Recipe('A Test another Recipe', 'This is simply another a test', 'https://www.inspiredtaste.net/wp-content/uploads' +
      '/2018/12/Sauteed-Zucchini-Recipe-1-1200.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
