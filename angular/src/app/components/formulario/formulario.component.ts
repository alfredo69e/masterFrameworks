import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public user: any;

  constructor() { }


  onSubmit(data: object) {
    console.log('llegue aca');

    console.log(data);
  }

  ngOnInit() {
    this.user = {
      nombre: null,
      apellidos: null,
      bio: null,
      genero: null
    }
  }

}
