import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/article';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() articles: Article[];
  public search: string;

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private router: Router
              ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {

      this.search = params.search;
      this.articleService.search(this.search)
      .subscribe((res) => {
        if (res.articles) {
          this.articles = res.articles;
        }
      }, (err) => {

        this.articles = [];

      });
    });
  }

}
