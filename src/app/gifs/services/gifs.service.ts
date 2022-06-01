import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = '2yeA8V5iBHOSpaVvbwYOYi66mQ6AcLYS';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
 
  
  buscarGifs(query:string = ''){
    
    query = query.trim().toLocaleLowerCase();// esto es para que siempre se almacenen en minuscula
    if(query.trim().length === 0){return;}// para que nose envien datos sin contenido
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); //esta linea lo que hace que solo permita mostrar datos del 1 al 10

      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',query);

   

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
        .subscribe((resp) =>{
          console.log(resp.data);
          this.resultados=resp.data;
          localStorage.setItem('resultados',JSON.stringify(this.resultados));
        });

    //esta es otra forma de ejecutar la api
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=2yeA8V5iBHOSpaVvbwYOYi66mQ6AcLYS&q=dragon ball z&limit=10');
    // const data = await resp.json();
    // console.log(data);
    
  }
  //unshift hace que se inserte en el primer lugar del arreglo la infromacion entrante
  //splice funciona para cortar el contenido del arreglo
  //includes lo que dice que si existe o se a incluido haz la sentencia
  // como el includes tiene el sibolo de negacion !,  --> continucacion debajo
  // hara lo contrario que seria que si no existe o no esta incluido haz la sentencia
  
 
}
