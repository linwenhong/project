import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  listType: number;

  constructor() { }

  ngOnInit() {
    this.listType = 1;
  }

  selectListType(type: number): void {
    if (type === this.listType) {
      return;
    }
    this.listType = type;
  }
}
