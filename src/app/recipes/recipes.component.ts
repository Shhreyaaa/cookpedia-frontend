import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import {FormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
  
})
export class RecipesComponent {

  p:number=1
  recipeList:any=[]
  cuisineArray:any=[]
  mealType:any=[]
  dummyRecipeList:any=[]
  searchKey:string=""

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(){
    this.getAllRecipe()
  }

  getAllRecipe(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      console.log(res);      
      this.recipeList=res
      this.dummyRecipeList=res
      this.recipeList.forEach((item:any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
        
        
      });
      this.recipeList.forEach((item:any) => {
        
        item.mealType.forEach((item:any) => {
          !this.mealType.includes(item) && this.mealType.push(item)          
        });
        
        
      });      
      // console.log(this.cuisineArray);
      // console.log(this.mealType);
    })
  }

  filterRecipe(key:string,value:string){
    this.recipeList=this.dummyRecipeList.filter((item:any)=>item[key]==value)

  }

  view_recipe(recipeId:string){
    if(sessionStorage.getItem('token')){
      this.router.navigateByUrl(`view-recipe/${recipeId}`)
    }
    else{
      alert("Please login to get full access to our recipe")
    }

  }


}
