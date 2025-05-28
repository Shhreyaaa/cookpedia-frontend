import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  Highcharts: typeof Highcharts = Highcharts
  chartOptions={}

  selected=new Date() 
  isSidebarOpen:boolean = true
  columnwidth:string='col-lg-10'
  userCount:number=0
  recipeCount:number=0
  FeedbackCount:number=0
  downloadCount:number=0

  constructor(private router:Router,private api:ApiService){

    if(localStorage.getItem("chartData")){
      let chartData=JSON.parse(localStorage.getItem("chartData")||'')

      this.chartOptions={
      chart:{
        type:'bar'
      },
      title:{
        text:'Analysis of download recipes based on cuisine',
        align:'left'
      },
      xAxis:{
        type:'category'
      },
      yAxis:{
        title:{
          text:'Total number of downloads'
        }
      }
      ,
      legend:{
        enabled:false
      },
      credits:{
        enabled:false
      },
      series:[
        {
        name:"Cuisine",
        colorByPoint:true,
        type:'bar',
        data:chartData
      }
      ]
    }
    }

    
  }

  

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getfeedbackCount()
    
  }

  menuBtnClick(){
    this.isSidebarOpen=!this.isSidebarOpen
    this.columnwidth='col'
    
  }

  getUserCount(){
    this.api.getUserApi().subscribe((res:any)=>{
      this.userCount=res.length
    })
  }

  getRecipeCount(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      this.recipeCount=res.length
    })
  }
  getDownloadCount(){
    this.api.getAlldownloadlistApi().subscribe((res:any)=>{
      this.downloadCount=res.map((item:any)=>item.count).reduce((a:any,b:any)=>a+b)      
      
    })
  }
  getfeedbackCount(){
    this.api.getAllfeedbacklistApi().subscribe((res:any)=>{
      this.FeedbackCount=res.filter((item:any)=>item.status=="Pending").length
    })
  }
 
  logout(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl('/')

  }

}
