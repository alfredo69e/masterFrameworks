import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/peliculas/pelicula.service';


@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {



  constructor(private peliculaService: PeliculaService) { }

  ngOnInit() {
  }

}
