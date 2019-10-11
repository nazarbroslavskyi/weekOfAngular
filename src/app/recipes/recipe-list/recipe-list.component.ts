import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://assets.blog.foodnetwork.ca/imageserve/wp-content/' +
      'uploads/sites/6/2016/02/Nori-Encrusted-Salmon-with-Soba-Noodles/x.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://assets.blog.foodnetwork.ca/imageserve/wp-content/' +
      'uploads/sites/6/2016/02/Nori-Encrusted-Salmon-with-Soba-Noodles/x.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
