import { ImagenService } from './../../services/imagen.service';
import { Subscription } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  texto = ''
  mostrar = false
  suscripcion: Subscription
  constructor(private _imagenService: ImagenService) {
    this.suscripcion = this._imagenService.getError().subscribe(data => {
      this.mostrarMensaje()
      this.texto = data
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.suscripcion.unsubscribe()
  }
  mostrarMensaje() {
    this.mostrar = true
    setTimeout(() => {
      this.mostrar = false
    }, 3000);
  }
}
