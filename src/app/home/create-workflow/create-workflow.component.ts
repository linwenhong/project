import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Project } from '../../common/project';
import { Report } from '../../common/report';
import { User } from '../../common/user';

const types = [
  { id: 0, name: '项目', key: 'projects' },
  { id: 1, name: '合同', key: 'projects' },
  { id: 2, name: '报告', key: 'reports' }
];

@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class CreateWorkflowComponent implements OnInit {
  Form: FormGroup;
  isSubmit: boolean = false;
  FormKeys: string[] = [
    'type',
    'fileId',
    'person_in_charge',
    'manager',
  ];
  users: User[];
  projects: Project[];
  reports: Report[];
  types: any[];
  files: Project[] | Report[];

  constructor(
    private router: Router,
    private http: Http,
    private  fb: FormBuilder
  ) { }

  ngOnInit() {
    this.projects = JSON.parse(localStorage.getItem('projects'));
    this.reports = JSON.parse(localStorage.getItem('reports'));
    this.types = types;
    this.files = this.projects;
    this.createForm();
    const FormCache = JSON.parse(sessionStorage.getItem('workflowForm'));
    if (FormCache) {
      this.setPatchValue(this.Form, FormCache);
    }
  }

  filesChange(id: number): void {
    for (const type of types) {
      if (type.id === Number(id)) {
        this.files = this[type.key];
      }
    }
  }

  getTypeName(id: number): string {
    for (const type of types) {
      if (type.id === Number(id)) {
        return type.name;
      }
    }
  }

  createForm(): void {
    this.Form = this.fb.group({
      type: [this.types[0].id, Validators.required],
      fileId: [null, Validators.required],
      person_in_charge: [null, Validators.required],
      manager: [null, Validators.required],
    });
  }

  getFormValue(form: FormGroup): Project {
    const formValue = new Project();
    this.FormKeys.forEach(key => {
      formValue[key] = form.get(key).value;
      if (key === 'fileId') {
        formValue[key] = Number(formValue[key]);
      }
    });
    return formValue;
  }

  setPatchValue(form: FormGroup, patchValue: Project): void {
    form.patchValue(patchValue);
  }

  submit(form: FormGroup): void {
    this.isSubmit = true;
    if (form.status === 'INVALID') {
      muiToast('请完善提交信息');
      return;
    }
    const request = this.getFormValue(form);
    this.setPatchValue(form, request);
    console.log(request);
    /**
     *TODO:提交项目申请表数据 => 跳转页面
     *simulation：模拟方法(保存提交数据)
     **/
    this.simulation(request);
  }

  simulation(project: Project): void {
    const time = new Date().getTime();
    project.id = time;
    project.create_time = time;
    project.progress_index = 1;
    sessionStorage.removeItem('projectForm');
    const projectsJson = localStorage.getItem('projects');
    let projects: Project[];
    if (!projectsJson) {
      projects = [project];
    } else {
      projects = JSON.parse(projectsJson);
      projects.push(project);
    }
    localStorage.setItem('projects', JSON.stringify(projects));
    console.log(projects);
  }

  revert() {
    this.isSubmit = false;
    this.Form.reset({
      person_in_charge: this.Form.get('person_in_charge').value,
      manager: this.Form.get('manager').value,
    });
  }
}

