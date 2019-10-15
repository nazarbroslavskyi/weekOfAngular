import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('amountInput', {static: false}) inputElement: TemplateRef<any>;
  constructor() { }

  ngOnInit() {
  }

  onAddIngredients(a, b) {
    console.log(this.inputElement);
  }

}
