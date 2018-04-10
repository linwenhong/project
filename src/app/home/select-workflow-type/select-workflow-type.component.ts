import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WORKFLOW_TYPES } from '../../common/workflow-types';

@Component({
  selector: 'app-select-workflow-type',
  templateUrl: './select-workflow-type.component.html',
  styleUrls: ['./select-workflow-type.component.css']
})
export class SelectWorkflowTypeComponent implements OnInit {
  types: Object[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    for (const key in WORKFLOW_TYPES) {
      this.types.push(WORKFLOW_TYPES[key]);
    }
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
