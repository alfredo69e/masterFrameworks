import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../../services/articles/article.service';
import { Article } from '../../models/article';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() articles: Article[];

  public textHome = 'Bienvenido al Curso de Angular con Alfredo Echeverria';
  public title = 'Ultimos titulos';



  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articles = [];
    this.articleService.getArticles(true)
    .subscribe((res) => {
      if (res.articles) {
        this.articles = res.articles;
      }
    }, (err) => {
      console.log(err);
    });
  }

}
