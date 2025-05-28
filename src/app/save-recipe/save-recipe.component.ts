import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-save-recipe',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './save-recipe.component.html',
  styleUrl: './save-recipe.component.css'
})
export class SaveRecipeComponent {

  savedRecipe:any=[]


  constructor(private api:ApiService){}

  ngOnInit(){
    this.getSavedRecipes()
  }

  getSavedRecipes(){
    this.api.getsaveRecipeApi().subscribe((res:any)=>{
      console.log(res);
      this.savedRecipe=res
      
    })
  }

  removeSaveRecipe(id:string){
    console.log(id);
    
    this.api.deletesaveRecipeApi(id).subscribe((res:any)=>{
      console.log(res);
      
      this.getSavedRecipes()
    })
  }

}
