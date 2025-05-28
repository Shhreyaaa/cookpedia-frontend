import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  userList:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.api.getUserApi().subscribe((res:any)=>{
      // console.log(res);
      this.userList=res
    })
  }


} 
