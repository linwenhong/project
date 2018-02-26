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
  @Input() returnParams: string = null;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (this.returnParams) {
      this.queryParams = JSON.parse(this.returnParams);
    }
    this.url = (this.url) ? this.url : '/home';
  }

  goHref(url: string): void {
    this.router.navigate([url], {
      queryParams: this.queryParams
    });
  }
}
