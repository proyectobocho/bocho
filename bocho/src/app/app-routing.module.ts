import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { RegisterComponent } from './components/register/register.component';
import { CheckLoginGuard } from '../app/guards/check-login';

const routes: Routes = [
  { path: '', component: PresentationComponent },
  { path: 'home', component: HomeComponent, canActivate: [CheckLoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
