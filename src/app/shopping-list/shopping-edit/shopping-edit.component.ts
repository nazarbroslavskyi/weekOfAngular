import { Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amntInputRef: ElementRef;
  @ViewChild('addIngredientsForm', { static: false }) slForm: NgForm;

  nameInput: string;
  amountInput: number;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingLIstService: ShoppingListService) { }
  ngOnInit() {
    this.subscription = this.shoppingLIstService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingLIstService.getIngredient(index);
        this.slForm.setValue({
          nameInput: this.editedItem.name,
          amountInput: this.editedItem.amount
        });
      }
    );
  }

  public onAddIngredients(form: NgForm) {
    // this.addedIngredient.emit({name: this.nameInputRef.nativeElement.value, amount: this.amntInputRef.nativeElement.value});
    if (this.editMode) {
      this.shoppingLIstService.onupdateIngredient(this.editedItemIndex, new Ingredient(form.value.nameInput, form.value.amountInput));
      this.editMode = false;
    } else {
      this.shoppingLIstService.onAddIngredient(new Ingredient(form.value.nameInput, form.value.amountInput));
    }
    this.slForm.reset();
  }

  public onDeleteIngredients() {
    this.shoppingLIstService.onDeleteIngerdient(this.editedItemIndex);
    this.onClearInputs();
  }

  private onClearInputs() {
    this.slForm.reset();
    this.editMode = false;
  }

  public onSubmitForm(formOfIngredients: NgForm, name, amnt) {
    this.onAddIngredients(formOfIngredients);
    console.log(formOfIngredients.value);
    console.log("name", name);
    console.log("amnt", amnt);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
