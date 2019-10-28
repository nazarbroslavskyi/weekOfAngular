import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {FormGroup, FormControl, FormArray} from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  newRecipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipe: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = !!params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }


  initForm() {
    let nameOfRecipe = '';
    let urlOfRecipeImg = '';
    let recipeDescription = '';
    let formArrayOfIngrediets = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipe.getRecipeById(this.id);
      nameOfRecipe = recipe.name;
      urlOfRecipeImg = recipe.imagePath;
      recipeDescription = recipe.description;

      for (let ingredient of recipe.ingredients) {
        formArrayOfIngrediets.push(new FormGroup({
          nameOfIngredient: new FormControl(ingredient.name),
          amntOfIngredient: new FormControl(ingredient.amount)
        }));
      }
    }

    this.newRecipeForm = new FormGroup({
      nameOfRecipe: new FormControl(nameOfRecipe),
      urlOfNewRecipe: new FormControl(urlOfRecipeImg),
      description: new FormControl(recipeDescription),
      ingredients: formArrayOfIngrediets
    });
  }

  handleSubmit() {
    console.log('frvr');
    console.log(this.newRecipeForm);
    // (this.newRecipeForm.get('ingredients') as FormArray).push() ;

  }
}
