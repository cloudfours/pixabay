import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
private error$=new Subject<string>()
private terminoBusqueda$=new Subject<string>()
  constructor(private http:HttpClient) { }
  setError(mensaje:string){
    this.error$.next(mensaje)
  }
  getError():Observable<string>{
return this.error$.asObservable()
  }
  enviarTerminoBusqueda(termino:string){
    this.terminoBusqueda$.next(termino)
  }
  getTerminoBusqueda():Observable<string>{
    return this.terminoBusqueda$.asObservable()
  }
  getImagenes(termino:string,imagenPorPagina:number,paginaActual:number):Observable<any>{
    const TOKEN='32811981-87d6b689975036e7b30e61cad'
    const URL='https://pixabay.com/api/?key='+TOKEN+'&q='+termino+'&per_page='+imagenPorPagina+'&page='+paginaActual
    return this.http.get(URL)
  }
}
