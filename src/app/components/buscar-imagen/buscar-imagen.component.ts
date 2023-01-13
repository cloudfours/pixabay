import { ImagenService } from './../../services/imagen.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent {
  nombreImagen: string;
  constructor(private _imagenService: ImagenService) {
    this.nombreImagen = ''
  }
  buscarImagenes() {
    if (this.nombreImagen === '') {
      this._imagenService.setError('agregar texto de busqueda')
      return;
    }
    this._imagenService.enviarTerminoBusqueda(this.nombreImagen)
  }


}
