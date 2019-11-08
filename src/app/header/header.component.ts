import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private http: HttpClient, private recipe: RecipeService) {}

  onSaveData() {
    this.http.put('https://angular-backend-ad6fe.firebaseio.com/posts.json', this.recipe.getRecipes()).subscribe();
  }

  onFetchData() {
    this.http.get<Recipe[]>('https://angular-backend-ad6fe.firebaseio.com/posts.json')
      .pipe(
        map(data => {
          if (data == null) {
            throw new Error('data is null');
          }
          return data;
        }))
      .subscribe(data => {
        this.recipe.recipes = data;
        this.recipe.recipesChanged.next(this.recipe.recipes.slice());
    }, error => console.log(error.message));
  }
}
