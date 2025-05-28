import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent {

  feedbackList:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getFeedbackList()
  }

  getFeedbackList(){
    this.api.getAllfeedbacklistApi().subscribe((res:any)=>{
      console.log(res);
      this.feedbackList=res
      
    })
  }

  updateFeedbackStatus(id:string,status:string){
    this.api.updatefeedbackApi(id,status).subscribe((res:any)=>{
      this.getFeedbackList()
    })
  }

deleteFeedback(id: string) {
  this.api.deleteFeedbackApi(id).subscribe({
    next: (res) => {
      this.getFeedbackList();
      alert("Feedback Deleted");
    },
    error: (err) => {
      console.error("Delete failed", err);
      if (err.status === 401) {
        alert("Session expired. Please login again.");
      } else {
        alert("Something went wrong.");
      }
    }
  });
}


}
