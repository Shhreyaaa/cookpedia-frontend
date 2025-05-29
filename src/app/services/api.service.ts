import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url="http://localhost:3000"

  constructor(private http:HttpClient) { }

  getAllRecipeApi(){
    return this.http.get(`${this.server_url}/get-allrecipes`)
  }

  addTestimonyApi(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }

  registerApi(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }
  loginApi(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }

  appendToken(){
    let headers=new HttpHeaders()
    const token=sessionStorage.getItem("token")

    if(token){
      headers=headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  singleRecipeApi(recipeId:string){
    return this.http.get(`${this.server_url}/view/recipe/${recipeId}`, this.appendToken())
  }

  
  downloadRecipeApi(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/download/recipe/${recipeId}`,reqBody,this.appendToken())
  }

  saveRecipeApi(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/save/recipe/${recipeId}`,reqBody,this.appendToken())
  }

  getsaveRecipeApi(){
    return this.http.get(`${this.server_url}/get-save-recipe`,this.appendToken())
  }

  deletesaveRecipeApi(recipeId:string){
    return this.http.delete(`${this.server_url}/remove-save-recipe/${recipeId}`,this.appendToken())
  }

  getDownloadRecipeApi(){
    return this.http.get(`${this.server_url}/get-download-recipe`,this.appendToken())
  }

  updateProfileApi(reqBody:any){
    return this.http.post(`${this.server_url}/edit-profile`,reqBody,this.appendToken())
  }

  getUserApi(){
    return this.http.get(`${this.server_url}/get-users`,this.appendToken())
  }

  getAlldownloadlistApi(){
    return this.http.get(`${this.server_url}/get-downloadlist`,this.appendToken())
  }

  getAllfeedbacklistApi(){
    return this.http.get(`${this.server_url}/get-feedbacklist`,this.appendToken())
  }

  updatefeedbackApi(feedbackId:string,status:string){
    return this.http.get(`${this.server_url}/update-feedback/${feedbackId}?status=${status}`,this.appendToken())
  }

  getApprovedfeedbackApi(){
    return this.http.get(`${this.server_url}/get-approved-feedbacklist`)
  }

  addRecipeApi(reqBody: any) {
    return this.http.post(`${this.server_url}/add-recipe`, reqBody, this.appendToken());
}

  updateRecipeApi(recipeId: string, reqBody: any) {
    return this.http.put(`${this.server_url}/edit-recipe/${recipeId}`, reqBody, this.appendToken());
  }

  deleteRecipeApi(recipeId: string) {
    return this.http.delete(`${this.server_url}/delete-recipe/${recipeId}`, this.appendToken());
  }

  deleteFeedbackApi(feedbackId:string){
    return this.http.delete(`${this.server_url}/delete-feedback/${feedbackId}`,this.appendToken())
  }

  getChartData(){
    this.getAlldownloadlistApi().subscribe((res:any)=>{
      let downloadArrayList:any=[]
      let output:any={}
      res.forEach((item:any)=>{
        let cuisine=item.recipeCuisine
        let currentCount=item.count
        if(output.hasOwnProperty(cuisine)){
          output[cuisine]+=currentCount

        }
        else{
          output[cuisine]=currentCount
        }
      })
      console.log(output);

      for(let cuisine in output){
        downloadArrayList.push({name:cuisine,y:output[cuisine]})
      }
      console.log(downloadArrayList);
      localStorage.setItem("chartData",JSON.stringify(downloadArrayList))

    })
    
  }


}
