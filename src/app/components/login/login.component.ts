import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSourceService } from 'src/app/services/data-source.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = '';

  constructor(private router: Router,private dataSourceService: DataSourceService) {}
  onSubmit() {
   this.dataSourceService.nombreUsuario =  this.nombre;
    this.router.navigate(['/pregunta']);
  }
}
