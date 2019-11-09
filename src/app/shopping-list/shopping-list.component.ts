import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];

  private ingredientChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    // Get all ingredients (Copy of ingredients)
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientChangeSub = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
      )
  }

  // Edit Ingredient
  editIngredient(index: number) {
    this.shoppingListService.ingredientEdit.next(index);
  }

  ngOnDestroy() {
    this.ingredientChangeSub.unsubscribe();
  }
}
