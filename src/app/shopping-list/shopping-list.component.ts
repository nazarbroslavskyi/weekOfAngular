import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  constructor(private shoppingLIstService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingLIstService.getIngredients();
    this.igChangeSub = this.shoppingLIstService.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
      }
    );
  }

  onEditItem(indexOfItem: number) {
    this.shoppingLIstService.startedEditing.next(indexOfItem);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
