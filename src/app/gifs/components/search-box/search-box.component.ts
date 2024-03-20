import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag( ) "
      #txtTagInput
    >
  `
})

export class SearchBoxComponent {
  // decorando el tagInput con el VielChild
  @ViewChild('txtTagInput')
  //Se crea una propiedad que sea la referencia del HTML arriba creado
  public tagInput!: ElementRef<HTMLInputElement>;

  // Los servicios se importan siempre en el constructor
  constructor( private gifsService: GifsService ) { }

  // searchTag( newTag: string ){
  searchTag( ){
    // se agrega a una constante el valor del tagInput
    const newTag = this.tagInput.nativeElement.value;
    // se manda por servicio el nuevo tag de busqueda
    this.gifsService.searchTag( newTag );
    // y una vez ya insertado se limpia el tagInput o componenete
    this.tagInput.nativeElement.value = '';

  }

}
