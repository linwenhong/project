import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-workflow-type',
  templateUrl: './select-workflow-type.component.html',
  styleUrls: ['./select-workflow-type.component.css']
})
export class SelectWorkflowTypeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    sessionStorage.removeItem('workflowForm');
  }

  select(type: number): void {
    this.router.navigate(['/home/create-workflow'], {
      queryParams: {
        type: type
      }
    });
  }
}
