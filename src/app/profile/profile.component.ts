import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileImg:string="https://img.freepik.com/premium-vector/user-profile-with-plus-line-icon-customer-follow-symbol-add-new-friend-vector-illustration_756957-1987.jpg?w=360"

  downloadList:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getDownloadList() 
    const user=JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profilePic){
      this.profileImg=user.profilePic
    }
  }
    
   getDownloadList(){
    this.api.getDownloadRecipeApi().subscribe((res:any)=>{
      // console.log(res);
      this.downloadList=res
      
    })
  }
  getFile(event:any){
    let uploadedFile=event.target.files[0]
    const fr=new FileReader()
    fr.readAsDataURL(uploadedFile)
    fr.onload=(event:any)=>{
      console.log(event.target.result);
      this.profileImg=event.target.result

      
    }
  }

  updateProfile(){
    this.api.updateProfileApi({profilePic:this.profileImg}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImg=res.profilePic 
      alert("profile updated successfully")
    })
  }

}
