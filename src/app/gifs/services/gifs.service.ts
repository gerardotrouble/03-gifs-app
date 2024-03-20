import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

// const GIPHY_APY_KEY = 'Xm3ehWthIR7qQssJBFz2WTYrISsV8IbA';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifsList: Gif[] = [];

  // propiedad para almacenar todos lo tag o las busquedas
  private _tagsHistory: string[] = [];
  private apiKey:       string = 'Xm3ehWthIR7qQssJBFz2WTYrISsV8IbA';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  // No simepre va asi solo es apra romper esa referencia de Js
  get tagsHistoy() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    // unshift es para añadirlo al principio
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistoy.splice(0, 10);
    this.saveLocalStorage();
  }

  // Grabar en el localstorage
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  // mostrar lo guardado en el localstorage
  private loadLocalStorage():void{
    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse (localStorage.getItem('history')!);

    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0]);

  }

  // Metodo que recibe el tag de la nueva busqueda
  searchTag(tag: string): void {6
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set( 'api_key', this.apiKey  )
      .set( 'limit', '10' )
      .set( 'q', tag )

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search?`, { params })
      .subscribe( resp => {
        this.gifsList = resp.data;
        console.log({gifs: this.gifsList});

      })

  }

}
