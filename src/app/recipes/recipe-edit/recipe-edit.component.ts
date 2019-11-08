import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { RecipeService } from '../recipe.service';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  newRecipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipe: RecipeService, private router: Router) {}

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
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [
            Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        }));
      }
    }

    this.newRecipeForm = new FormGroup({
      nameOfRecipe: new FormControl(nameOfRecipe, Validators.required),
      urlOfNewRecipe: new FormControl(urlOfRecipeImg, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: formArrayOfIngrediets
    });
  }

  onSubmit() {
    console.log(this.newRecipeForm);
    const newRecipe = new Recipe(this.newRecipeForm.value.nameOfRecipe,
      this.newRecipeForm.value.description,
      this.newRecipeForm.value.urlOfNewRecipe,
      this.newRecipeForm.value.ingredients
    );
    if (this.editMode) {
      this.recipe.updateRecipes(this.id, newRecipe);
    } else {
      this.recipe.addNewRecipe(newRecipe);
    }
    this.onCancelEditRecipe();
  }

  onAddIngredient() {
    (this.newRecipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  public onDeleteRecipe(): void {
    this.recipe.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

  public onCancelEditRecipe(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  public onDeleteIngredient(indexOfIngredient: number) {
    (this.newRecipeForm.get('ingredients') as FormArray).removeAt(indexOfIngredient);
  }
}
