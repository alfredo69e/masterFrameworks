import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/articles/article.service';
import { Globals } from 'src/app/services/globals/globals';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  public article: Article;
  public url = Globals.url;

  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png,.gif,.jpeg',
    maxSize: '50',
    uploadAPI: {
      url: `${Globals.url}/upload-image`
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la imgen del Articulo...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private router: Router) { }

  onSubmit(id: string, data: object) {
    this.articleService.update(id, data)
    .subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.article = res.articleStore;
        Swal.fire('Articulo Editado!', 'El Articulo se a Editado correctamente!', 'success');
        this.router.navigate(['/blog/article', id]);
      }
    }, (err) => {
      console.log(err);
    });
  }

  imageUpload(data: any) {
     // tslint:disable-next-line: variable-name
     const image_data = JSON.parse(data.response);
     this.article.image = image_data.image;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.articleService.getArticle(params.id)
      .subscribe((res) => {
        if (res.status === 'success' ) {
          this.article = res.article;
        } else {
          this.router.navigate(['/blog']);
        }
      }, (err) => {
        console.log(err);
        this.router.navigate(['/blog']);
      });
    });
  }

}
