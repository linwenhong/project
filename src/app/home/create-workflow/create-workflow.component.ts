import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  type: number;
  condition: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http,
    private  fb: FormBuilder
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.type) {
        this.type = queryParams.type;
        this.getFiles(this.type);
      }
    });
    this.types = types;
    this.createForm();
  }

  ngOnInit() {
    this.condition = '项目';
    this.isSubmit = false;
    const FormCache = JSON.parse(sessionStorage.getItem('workflowForm'));
    if (FormCache) {
      this.type = FormCache.type;
      this.getFiles(this.type);
      this.setPatchValue(this.Form, FormCache);
    }
  }

  getFiles(type: number): void {
    switch (Number(type)) {
      case 0:
        this.files = JSON.parse(localStorage.getItem('projects'));
        break;
      case 1:
        this.files = JSON.parse(localStorage.getItem('contracts'));
        break;
      case 2:
        this.files = JSON.parse(localStorage.getItem('reports'));
        break;
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
      type: this.type,
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
      if (this.getTypeName(form.get('type').value) === this.condition &&
        (key === 'testing_person' || key === 'verifying_person')) {
        return;
      }
      if (this.getTypeName(form.get('type').value) !== this.condition &&
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
    if (this.getTypeName(form.get('type').value) !== this.condition &&
      (!form.get('testing_person').value || !form.get('verifying_person').value)) {
      muiToast('请选择相关人员');
      return;
    }
    if (this.getTypeName(form.get('type').value) === this.condition &&
      (!form.get('person_in_charge').value || !form.get('manager').value)) {
      muiToast('请选择相关人员');
      return;
    }
    const request = this.getFormValue(form);
    if (this.getTypeName(request.type) !== this.condition &&
      (request.testing_person.length === 0 || request.verifying_person.length === 0)) {
      muiToast('请选择相关人员');
      return;
    }
    if (this.getTypeName(request.type) === this.condition &&
      (request.person_in_charge.length === 0 || request.manager.length === 0)) {
      muiToast('请选择相关人员');
      return;
    }
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

