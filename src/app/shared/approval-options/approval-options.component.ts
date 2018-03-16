import { Component, Input,  OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval-options',
  templateUrl: './approval-options.component.html',
  styleUrls: ['./approval-options.component.css']
})
export class ApprovalOptionsComponent implements OnInit {
  @Input() procedureIndex: number;
  @Input() queryParams: Object;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  options(option: boolean): void {
    const Params = this.queryParams;
    Params['option'] = option;
    this.router.navigate(['/home/approval'], {
      queryParams: Params
    })
  }
}
