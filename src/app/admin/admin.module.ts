import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipeLIstComponent } from './recipe-list/recipe-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { SearchPipe } from '../pipes/search.pipe';
import {MatCardModule} from '@angular/material/card'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core';
import { HighchartsChartModule } from 'highcharts-angular'


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    RecipeLIstComponent,
    UserListComponent,
    ManageRecipeComponent,
    FeedbackListComponent,
    DownloadListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SearchPipe,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HighchartsChartModule

    
  ]
})
export class AdminModule { }
