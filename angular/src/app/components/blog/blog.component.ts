import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/articles/article.service';
import { Article } from '../../models/article';
import { Globals } from '../../services/globals/globals';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public articles: Article[];
  public url = Globals.url;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles()
    .subscribe((res) => {
      if (res.articles) {
        this.articles = res.articles;
      }
    }, (err) => {
      console.log(err);
    });
  }

}
