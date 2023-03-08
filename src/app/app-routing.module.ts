import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { SaveUserComponent } from './save-user/save-user.component';
import { SaveRoleComponent } from './save-role/save-role.component'; 
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', canActivate: [AuthGuard], component: UserListComponent},
  {path: 'role-save', canActivate: [AuthGuard], component: SaveRoleComponent},
  {path: 'signup', component: SaveUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
