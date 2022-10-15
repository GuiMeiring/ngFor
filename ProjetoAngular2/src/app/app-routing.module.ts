import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const appRoutes: Routes =[
   {path: 'login', component: LoginComponent},
   {path: 'cadastro', component:CadastroComponent}
]



@NgModule({
  declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(appRoutes),
    ],
   exports: [RouterModule],
  })
export class AppRoutingModule { }
