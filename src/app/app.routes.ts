import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SaveRecipeComponent } from './save-recipe/save-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { PnfComponent } from './pnf/pnf.component';
import { RecipesComponent } from './recipes/recipes.component';
import { adminGuardGuard } from './guards/admin-guard.guard';
import { userGuardGuard } from './guards/user-guard.guard';


export const routes: Routes = [

    // Lazy loading
    {path:"admin", canActivate:[adminGuardGuard], loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},


    {path:"",component:HomeComponent,title:"Home Page"},
    {path:"about",component:AboutComponent,title:"About Page"},
    {path:"contact",component:ContactComponent,title:"Contact Page"},
    {path:"login",component:LoginComponent,title:"Login Page"},
    {path:"register",component:RegisterComponent,title:"Sign-up Page"},
    {path:"profile",canActivate:[userGuardGuard], component:ProfileComponent,title:"Profile Page"},
    {path:"recipes",component:RecipesComponent,title:"Recipe"},
    {path:"save-recipe",canActivate:[userGuardGuard], component:SaveRecipeComponent,title:"Recipe-collection"},
    {path:"view-recipe/:id",canActivate:[userGuardGuard], component:ViewRecipeComponent,title:"Recipe Details"},
    {path:"**",component:PnfComponent,title:"Page Not Found"},
];
