import { Component, Input,  OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() url: string;
  @Input() queryParams: any;
  @Input() return_url: string = null;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (this.return_url) {
      this.queryParams = JSON.parse(this.return_url);
    }
    this.url = (this.url) ? this.url : '/home';
  }

  goHref(url: string): void {
    this.router.navigate([url], {
      queryParams: this.queryParams
    });
  }
}
