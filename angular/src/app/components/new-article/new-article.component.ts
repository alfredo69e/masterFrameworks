import { Component, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from 'src/app/services/articles/article.service';
import { Router } from '@angular/router';
import { Globals } from '../../services/globals/globals';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  public article: Article;
  public status: string;

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

  constructor(private articleService: ArticleService,
              private router: Router
  ) {

  }

  onSubmit(data: object) {
    this.articleService.create(data)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === 'success') {
          this.status = 'success';
          this.article = res.articleStore;
          Swal.fire('Articulo Creado!', 'El Articulo se a creado correctamente!', 'success');
          this.router.navigate(['/blog']);
        } else {
          this.status = 'error';
        }
      }, (err) => {
        console.log(err);
        this.status = 'error';
      });
  }

  imageUpload(data: any) {

    console.log(data.response);
 // tslint:disable-next-line: variable-name
    const image_data = JSON.parse(data.response);
    this.article.image = image_data.image;
  }

  ngOnInit() {

    this.article = new Article('', '', '', '', '');

  }

}
