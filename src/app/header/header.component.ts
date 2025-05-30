import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedin:boolean=false
  userName:string=''

  constructor(private router:Router){}

  ngOnInit(){
    if(sessionStorage.getItem("token")&& sessionStorage.getItem("user")){
      this.isLoggedin=true
      this.userName=JSON.parse(sessionStorage.getItem("user")||"").username
    }
    else{
      this.isLoggedin=false
      this.userName=""
    }
  }

  logout(){
    sessionStorage.clear()
    this.isLoggedin=false
    this.userName=""
    this.router.navigateByUrl('/')
  }
}
