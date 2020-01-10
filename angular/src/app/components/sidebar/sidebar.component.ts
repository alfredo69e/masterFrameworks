import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public search: string;

  constructor( private router: Router ) { }

  searchArticles(data: string) {
    this.router.navigate(['/search', data]);
  }

  ngOnInit() {

  }

}
