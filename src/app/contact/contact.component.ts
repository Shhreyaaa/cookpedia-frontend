import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  testimonyForm:FormGroup

  constructor(private fb:FormBuilder, private api:ApiService){
    this.testimonyForm=this.fb.group({

      name:["",[Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      email:["",[Validators.required,Validators.email]],
      message:["",[Validators.required,Validators.pattern("[a-zA-Z0-9 ]*")]]

    })
  }

  addTestimony(){
    
    if(this.testimonyForm.valid){
      const name=this.testimonyForm.value.name   
      const email=this.testimonyForm.value.email 
      const message=this.testimonyForm.value.message  
      
      // api call
      this.api.addTestimonyApi({name,email,message}).subscribe((res:any)=>{
        alert("Thankyou for your valuable thoughts")
        this.testimonyForm.reset()
        
      })
    }
    else{
      alert('invalid form')
    }
  }

}
