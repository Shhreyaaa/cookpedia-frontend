import { Component, Input, input } from '@angular/core';
import { RecipeModel } from '../Model/RecipeModel';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {
  @Input()id!:string
  recipeDetails:RecipeModel={}
  cuisineArray:any=[]
  mealTypeArray:any=[]
  ingredients:any=[]
  instructions:any=[]
  mealArray:any=[]

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      console.log(res);

      if(this.id){
        this.recipeDetails=res.find((item:any)=>item._id==this.id)
        this.ingredients=this.recipeDetails.ingredients
        this.instructions=this.recipeDetails.instructions
        this.mealArray=this.recipeDetails.mealType
      }

      res.forEach((item:any)=>{

        !this.cuisineArray.includes(item.cuisine) &&
        this.cuisineArray.push(item.cuisine)
      })
      console.log(this.cuisineArray);

      res.forEach((item:any)=>{

        item.mealType.forEach((mealType:any)=>{
          !this.mealTypeArray.includes(mealType) &&
          this.mealTypeArray.push(mealType)
        })
      })
      console.log(this.mealTypeArray);
      
    })
  }

  addIngredients(ingredientInput:any){
    if(ingredientInput.value){
      this.ingredients.push(ingredientInput.value)
      ingredientInput.value=''
      console.log(this.ingredients);      

    }
  }
  removeIngredient(value:string){
    this.ingredients=this.ingredients.filter((item:any)=>item!=value)
  }

  addInstructions(instructionInput:any){
    if(instructionInput.value){
      this.instructions.push(instructionInput.value)
      instructionInput.value=''
      console.log(this.instructions);      

    }
  }

  removeInstruction(value:string){
    this.instructions=this.instructions.filter((item:any)=>item!=value)
    console.log(this.instructions);
    
  }

  mealTypeSelect(event:any){
    if(event.target.checked){
      !this.mealArray.includes(event.target.name)&& this.mealArray.push(event.target.name)
    }
    else{
      this.mealArray=this.mealArray.filter((item:any)=>item!=event.target.name)
    }
    console.log(this.mealArray);
  }

  removeMealType(meal:string){
    this.mealArray=this.mealArray.filter((item:any)=>item!=meal)

  }

  addRecipe(){
    
    this.recipeDetails.ingredients=this.ingredients
    this.recipeDetails.instructions=this.instructions
    this.recipeDetails.mealType=this.mealArray
    console.log(this.recipeDetails);  
    
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=this.recipeDetails

    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
// api call
      this.api.addRecipeApi(this.recipeDetails).subscribe({
        next:((res:any)=>{
          alert("recipe added to the list")
          this.recipeDetails={}
          this.ingredients=[]
          this.instructions=[] 
          this.mealArray=[]
          this.router.navigateByUrl('/admin/recipe-list')

        }),
        error:((reason:any)=>{
          alert(reason.error)
          this.recipeDetails.name=''
        })
      })

      

    }
    else{
      alert('Please fill all the fields')
    }
  }

  updateRecipe(){
    this.recipeDetails.ingredients=this.ingredients
    this.recipeDetails.instructions=this.instructions
    this.recipeDetails.mealType=this.mealArray
    console.log(this.recipeDetails);  
    
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=this.recipeDetails

    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
// api call
      this.api.updateRecipeApi(this.id,this.recipeDetails).subscribe((res:any)=>{
        alert("recipe updated successfully")
        this.recipeDetails={}
        this.ingredients=[]
        this.instructions=[] 
        this.mealArray=[]
        this.router.navigateByUrl('/admin/recipe-list')
      })
      

    }
    else{
      alert('Please fill all the fields')
    }

  }
  

}
