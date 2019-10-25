import {Component, OnInit, TemplateRef, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amntInputRef: ElementRef;

  nameInput: string;
  amountInput: number;

  constructor(private shoppingLIstService: ShoppingListService) { }
  ngOnInit() {}

  onAddIngredients(form: NgForm) {
    // this.addedIngredient.emit({name: this.nameInputRef.nativeElement.value, amount: this.amntInputRef.nativeElement.value});
    this.shoppingLIstService.onAddIngredient(new Ingredient(form.value.nameInput, form.value.amountInput));
  }

  public onDeleteIngredients() {
    console.log('delete');
  }

  onClearInputs() {
    console.log('clear');
  }

  onSubmitForm(formOfIngredients: NgForm, name, amnt) {
    this.onAddIngredients(formOfIngredients);
    console.log(formOfIngredients.value);
    console.log("name", name);
    console.log("amnt", amnt);
  }
}
