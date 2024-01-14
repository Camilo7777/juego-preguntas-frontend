import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { DataSourceService } from 'src/app/services/data-source.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  public opc: number = 0;
  pregunta: any;
  respuestaCorrecta: string = '';
  nombreUsuario: string = '';
  puntaje: number = 0;
  respuestaEnviada: boolean = false;

  constructor(private dataSourceService: DataSourceService, private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.nombreUsuario = this.dataSourceService.nombreUsuario;
    this.obtenerNuevaPregunta();
  }

  obtenerNuevaPregunta() {
    this.dataSourceService.getData().subscribe((data: any) => {
      this.pregunta = data;
      this.respuestaCorrecta = data.respuestaCorrecta;
      this.dataSourceService.opc = this.dataSourceService.opc + 1;
      this.respuestaEnviada = false;
    });
  }

  onSubmit() {
    console.log('Respuesta seleccionada:', this.pregunta.respuestaSeleccionada);
    this.respuestaEnviada = true;
    if (this.pregunta.respuestaSeleccionada === this.respuestaCorrecta) {
      this.puntaje += 1;
      if (this.puntaje === 5) {
        this.mostrarAlertaVictoria();
      } else {
        const confirmarContinuar = window.confirm('Respuesta correcta, ¿desea continuar?');
        this.obtenerNuevaPregunta();
        if (!confirmarContinuar) {
          this.guardarPuntajeYRedirigir();
        }
      }
    } else {
      this.mostrarMensajeEmergente('Respuesta incorrecta. Usted ha perdido.', false);
      this.dataSourceService.opc = 1;
      this.router.navigate(['/']);
      this.puntaje = 0;
    }
  }

  private mostrarAlertaVictoria() {
    this.mostrarMensajeEmergente('¡Has ganado el juego! Eres el puto amo.', true);
    this.dataSourceService.registerPlayer(this.nombreUsuario, this.puntaje).subscribe(
      (response) => {
        console.log('Usuario registrado correctamente:', response);
        this.dataSourceService.opc = 1;
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }

  private guardarPuntajeYRedirigir() {
    this.dataSourceService.registerPlayer(this.nombreUsuario, this.puntaje).subscribe(
      (response) => {
        console.log('Usuario registrado correctamente:', response);
        this.dataSourceService.opc = 1;
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }

  private mostrarMensajeEmergente(mensaje: string, esExito: boolean) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: esExito ? 'mensaje-exito' : 'mensaje-error',
    });
  }
  }

