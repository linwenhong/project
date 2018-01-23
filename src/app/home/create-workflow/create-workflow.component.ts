import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Project } from '../../common/project';
import { Report } from '../../common/report';
import { Workflow } from '../../common/workflow';

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
  isSubmit: boolean;
  FormKeys: string[] = [
    'type',
    'fileId',
    'testing_person',
    'verifying_person',
    'person_in_charge',
    'manager',
  ];
  projects: Project[];
  reports: Report[];
  types: any[];
  files: Project[] | Report[];

  constructor(
    private router: Router,
    private http: Http,
    private  fb: FormBuilder
  ) {
    this.projects = JSON.parse(localStorage.getItem('projects'));
    this.reports = JSON.parse(localStorage.getItem('reports'));
    this.types = types;
    this.files = this.projects;
    this.createForm();
  }

  ngOnInit() {
    this.isSubmit = false;
    const FormCache = JSON.parse(sessionStorage.getItem('workflowForm'));
    if (FormCache) {
      if (this.getTypeName(FormCache.type) === '报告') {
        this.files = this.reports;
      }
      this.setPatchValue(this.Form, FormCache);
    }
  }

  filesChange(id: number): void {
    for (const type of types) {
      if (type.id === Number(id)) {
        this.files = this[type.key];
        this.Form.patchValue({
          fileId: null
        });
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
      type: [this.types ? this.types[0].id : null, Validators.required],
      fileId: [null, Validators.required],
      // 报告/合同
      testing_person: null,
      verifying_person: null,
      // 项目
      person_in_charge: null,
      manager: null,
    });
  }

  getFormValue(form: FormGroup): Workflow {
    const formValue = new Workflow();
    this.FormKeys.forEach(key => {
      if (this.getTypeName(form.get('type').value) === '项目' &&
        (key === 'testing_person' || key === 'verifying_person')) {
        return;
      }
      if (this.getTypeName(form.get('type').value) !== '项目' &&
        (key === 'person_in_charge' || key === 'manager')) {
        return;
      }
      formValue[key] = form.get(key).value;
      if (key === 'fileId' || key === 'type') {
        formValue[key] = Number(formValue[key]);
      }
    });
    return formValue;
  }

  setPatchValue(form: FormGroup, patchValue: Workflow): void {
    form.patchValue(patchValue);
  }

  submit(form: FormGroup): void {
    this.isSubmit = true;
    if (!form.get('fileId').value) {
      muiToast(`请选择${ this.getTypeName(form.get('type').value) }`);
      return;
    }
    if (this.getTypeName(form.get('type').value) !== '项目' &&
      (!form.get('testing_person').value || !form.get('verifying_person').value)) {
      muiToast('请选择相关人员');
      return;
    }
    if (this.getTypeName(form.get('type').value) === '项目' &&
      (!form.get('person_in_charge').value || !form.get('manager').value)) {
      muiToast('请选择相关人员');
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

  simulation(workflow: Workflow): void {
    const time = new Date().getTime();
    workflow.id = time;
    workflow.create_time = time;
    sessionStorage.removeItem('workflowForm');
    const workflowJson = localStorage.getItem('workflows');
    let workflows: Workflow[];
    if (!workflowJson) {
      workflows = [workflow];
    } else {
      workflows = JSON.parse(workflowJson);
      workflows.push(workflow);
    }
    localStorage.setItem('workflows', JSON.stringify(workflows));
    console.log(workflows);
    this.router.navigate(['/home']);
  }

  revert() {
    this.isSubmit = false;
    this.Form.reset({
      type: this.Form.get('type').value
    });
  }
}

