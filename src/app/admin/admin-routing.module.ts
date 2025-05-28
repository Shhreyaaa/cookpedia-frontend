import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeLIstComponent } from './recipe-list/recipe-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';

const routes: Routes = [
  {path:"",component:DashboardComponent},
  {path:"recipe-list",component:RecipeLIstComponent},
  {path:"user-list",component:UserListComponent},
  {path:"feedback-list",component:FeedbackListComponent},
  {path:"download-list",component:DownloadListComponent},
  {path:"add-recipe",component:ManageRecipeComponent},
  {path:"edit-recipe/:id",component:ManageRecipeComponent}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
