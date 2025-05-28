import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {

  recipeId:string=""
  recipe:any={}

  constructor(private ar:ActivatedRoute, private api:ApiService ){}

  ngOnInit(){
    this.ar.params.subscribe((res:any)=>{
      console.log(res);
      this.recipeId=res.id
      this.getRecipe()
      
    })
  }

  getRecipe(){
    this.api.singleRecipeApi(this.recipeId).subscribe((res:any)=>{
      console.log(res);
      this.recipe=res
      
    })
  }

  // generating pdf
  generatePdf(){
    const pdf=new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor('red')
    pdf.text(this.recipe.name,10,10)

    pdf.setFontSize(12)
    pdf.setTextColor('black')
    pdf.text(`Cusine:${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings:${this.recipe.servings}`,10,25)
    pdf.text(`Mode of cooking:${this.recipe.difficulty}`,10,30)
    pdf.text(`Preparation time:${this.recipe.prepTimeMinutes}`,10,35)
    pdf.text(`Cooking time:${this.recipe.cookTimeMinutes}`,10,40)
    pdf.text(`Calorie per serving:${this.recipe.caloriesPerServing}`,10,45)

    let head=[['Ingredients','Cooking Instruction']]
    let body=[]
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')
  }

  downloadRecipe(){
    this.api.downloadRecipeApi(this.recipeId,this.recipe).subscribe((res:any)=>{
      this.api.getChartData()
      this.generatePdf()
    })
  }

  saveRecipe(){
    this.api.saveRecipeApi(this.recipeId,this.recipe).subscribe({
      next:(res:any)=>{
        alert('Recipe added to your collection')
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }

}
