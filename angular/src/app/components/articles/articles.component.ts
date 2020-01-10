import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/article';
import { Globals } from '../../services/globals/globals';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  @Input() articles: Article[];

  public url = Globals.url;

  constructor() { }

  ngOnInit() {
  }

}
