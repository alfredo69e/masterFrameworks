import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/articles/article.service';
import { Article } from '../../models/article';
import { Router, ActivatedRoute} from '@angular/router';
import { Globals } from '../../services/globals/globals';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public url = Globals.url;

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private route: Router
              ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      let id = params.id;

      this.articleService.getArticle(id)
      .subscribe((res) => {
        console.log(res);
        if (res.article) {
          this.article = res.article;
        } else {
          this.route.navigate(['/home']);
        }
      }, (err) => {
        console.log(err);
      });

    });

  }

}
