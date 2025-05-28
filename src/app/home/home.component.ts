import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  recipeList:any=[]
  feedbackList:any=[]

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
    this.getApprovedFeedback()
  }

  getAllRecipes(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      // console.log(res);      
      this.recipeList=res.slice(0,6)
    })
  }

  view_recipe(recipeId:string){
    if(sessionStorage.getItem('token')){
      this.router.navigateByUrl(`view-recipe/${recipeId}`)
    }
    else{
      alert("Please login to get full access to our recipe")
    }

  }

  getApprovedFeedback(){
    this.api.getApprovedfeedbackApi().subscribe((res:any)=>{
      // console.log(res);
      this.feedbackList=res
      
    })

  }


}
