import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  public opc :number =1;
  public nombreUsuario: string = '';


  private urlFaciles : string = 'http://localhost:8080/pregunta/faciles';
  private urlMedias : string = 'http://localhost:8080/pregunta/medias';
  private urlDificiles : string = 'http://localhost:8080/pregunta/dificiles';
  private urlComplicadas : string = 'http://localhost:8080/pregunta/complicadas';
  private urlImposibles : string = 'http://localhost:8080/pregunta/imposibles';
  private urlSave : string = 'http://localhost:8080/jugador/';

  constructor(private http: HttpClient) {}


  getData(): Observable<any[]> {
    console.log(this.opc);

    if(this.opc == 1){
      return this.http.get<any[]>(this.urlFaciles);
    }
    else if(this.opc == 2){
      return this.http.get<any[]>(this.urlMedias);
    }

    else if(this.opc == 3){
      return this.http.get<any[]>(this.urlDificiles);
    }

    else if(this.opc == 4){
      return this.http.get<any[]>(this.urlComplicadas);
    }else{
      return this.http.get<any[]>(this.urlImposibles);
    }

  }

  registerPlayer(nombre: string, puntaje: number): Observable<any> {
    const user = { nombre: nombre, total: puntaje };
    return this.http.post(this.urlSave, user);
  }

}
