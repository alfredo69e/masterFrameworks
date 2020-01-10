import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  public article: Article;

  constructor() { }

  onSubmit(data: object) {

  }

  ngOnInit() {
    this.article = new Article('', '', '', '', '');
  }

}
