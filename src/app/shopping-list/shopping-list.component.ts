import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingLIstService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingLIstService.getIngredients();
    this.shoppingLIstService.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
      }
    );
  }

}
