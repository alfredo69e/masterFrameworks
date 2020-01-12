import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Globals } from '../globals/globals';



@Injectable({
  providedIn: 'root'
})
export class ArticleService {

constructor(private http: HttpClient) { }


getArticles(last: boolean = null): Observable<any> {

  let articles = 'articles';
  if (last) {
    articles = 'articles/true';
  }

  return this.http.get(`${Globals.url}/${articles}`);
}

getArticle(id: string): Observable<any> {
  return this.http.get(`${Globals.url}/article/${id}`);
}

search(search: string): Observable<any> {
  return this.http.get(`${Globals.url}/search/${search}`);
}

create(article: object): Observable<any> {
  const params = JSON.stringify(article);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http.post(`${Globals.url}/save`, params, { headers });

}

update(id: string, data: object): Observable<any> {
  const params = JSON.stringify(data);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.put(`${Globals.url}/article/${id}`, params, { headers });
}

delete(id: string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.http.delete(`${Globals.url}/article/${id}`, { headers });
}



}


