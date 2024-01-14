import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'pregunta', component: PreguntaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
