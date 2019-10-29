import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  id: number;
  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private recipes: RecipeService,
              private router: Router ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = params.id;
          this.recipe = this.recipes.getRecipeById(this.id);
      }
    );
  }

  addToShoppingLIst(recipe) {
    console.log(...recipe.ingredients);
    this.shoppingListService.onAddArrayOfIngredients(recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  public onDeleteRecipe(): void {
    this.recipes.deleteRecipe(this.id);
    this.router.navigate(['recipes'], {relativeTo: this.route});
  }

  ngOnDestroy() {}
}
