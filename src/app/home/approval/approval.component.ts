import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  id: number;
  option: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.id = queryParams.id;
      this.option = queryParams.option;
      console.log(this.id, this.option);
    });
  }

  options(option: boolean): void {
    if (option) {
      this.router.navigate(['/home/projects']);
      return;
    }
    this.router.navigate(['/home/project/' + this.id]);
  }

}
