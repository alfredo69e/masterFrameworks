import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/articles/article.service';
import { Article } from '../../models/article';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../services/globals/globals';
import Swal from 'sweetalert2';

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

  delete(id: string) {
    Swal.fire({
      title: 'Eliminar Articulo?',
      text: 'Seguro desea eliminar el Articulo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire('Articulo Eliminado!', 'El Articulo se a eliminado correctamente!', 'success');
        this.route.navigate(['/blog']);
      }
    });

  }

  edit(id: string) {
    this.route.navigate(['/article-edit', id]);
  }

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
