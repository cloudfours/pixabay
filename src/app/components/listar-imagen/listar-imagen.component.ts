import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent {
  termino = ''
  suscription: Subscription
  listaImagenes: any[] = []
  loading = false
  imagenesPorPagina = 30
  paginaActual = 1
  calcularTotalPaginas = 0
  constructor(private _imagenService: ImagenService, private http: HttpClient) {
    this.suscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
      this.termino = data
      this.loading = true
      this.paginaActual=1;
      this.obtenerImagenes()

    })
  }
  obtenerImagenes() {
    this._imagenService.getImagenes(this.termino,this.imagenesPorPagina,this.paginaActual).subscribe(data => {
      this.loading = false;

      if (data.hits.length === 0) {
        this._imagenService.setError('Opss...No encontramos ningun resultado')
        return;
      }
      this.listaImagenes = data.hits;
      this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina)

    }, error => {
      this.loading = false
      this._imagenService.setError('Opss..ocurrio un error')
    })
  }
  paginaAnterior() {
    this.paginaActual--;
    this.loading=true;
    this.listaImagenes=[]
    this.obtenerImagenes()
  }
  paginaSiguiente() {
    this.paginaActual++;
    this.loading=true
    this.listaImagenes=[]
    this.obtenerImagenes()
  }
  paginaAnteriorClass() {
    if (this.paginaActual === 1) {
      return false;
    } else {
      return true;
    }
  }
  paginaSeguienteClass(){
    if(this.paginaActual===this.calcularTotalPaginas){
      return false;
    }else{
      return true;
    }
  }
}
