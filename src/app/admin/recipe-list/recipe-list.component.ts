import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeLIstComponent {

  recipeList:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getRecipe()
  }

getRecipe(){
  this.api.getAllRecipeApi().subscribe((res:any)=>{

    this.recipeList=res
  })
}

deleteRecipe(id:string){
  this.api.deleteRecipeApi(id).subscribe((res:any)=>{
    this.getRecipe()
  })
}

}
