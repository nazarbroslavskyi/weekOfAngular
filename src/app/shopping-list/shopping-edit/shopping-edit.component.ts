import {Component, OnInit, TemplateRef, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amntInputRef: ElementRef;
  // @Output() addedIngredient = new EventEmitter<{name: string, amount: number}>();

  constructor(private shoppingLIstService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredients() {
    // this.addedIngredient.emit({name: this.nameInputRef.nativeElement.value, amount: this.amntInputRef.nativeElement.value});
    this.shoppingLIstService.onAddIngredient(new Ingredient(this.nameInputRef.nativeElement.value,  this.amntInputRef.nativeElement.value));
  }

}
