import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  constructor(private gifsService: GifsService){} //esta es la injeccion del servicio

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //esto lo que va a buscar el elemento con la referencia local que este asignada en el html 
// ! es un operador para asegurarse de que el objeto no es nulo

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
    
  }
}
