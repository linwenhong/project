import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Project } from '../../common/project';
import { User } from '../../common/user';
import { Report } from '../../common/report';

const types = [
  { id: 2548, text: '问题' },
  { id: 5426, text: '功能' },
  { id: 9856, text: '需求' }
];

const formats = [
  { id: 'A2548', text: 'word文档' },
  { id: 'A5426', text: 'excel表格' },
  { id: 'A9856', text: '图片' }
];

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css', '../create-project/create-project.component.css']
})

export class CreateReportComponent implements OnInit, AfterViewChecked {
  reportForm: FormGroup;
  isSubmit: boolean = false;
  reportFormKeys: string[] = [
    'name',
    'project',
    'type',
    'format',
    'record_number',
    'blind_sample_number',
    'element',

    'person_in_charge'
  ];
  users: User[];

  canSetDateTimeGroup: boolean = true;

  projects: Project[];
  types: any[];
  formats: any[];

  constructor(
    private router: Router,
    private http: Http,
    private  fb: FormBuilder
  ) {
    this.http.get('assets/json/users.json').toPromise().then(response => {
      this.users = response.json();
      this.projects = JSON.parse(localStorage.getItem('projects'));
      this.types = types;
      this.formats = formats;

      this.createForm();

      const reportFormCache = JSON.parse(sessionStorage.getItem('reportForm'));
      if (reportFormCache) {
        console.log(reportFormCache);
        this.setPatchValue(this.reportForm, reportFormCache);
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.canSetDateTimeGroup && this.reportForm) {
      this.canSetDateTimeGroup = false;
      setDateTimeGroup('.dateTime');
    }
  }

  createForm(): void {
    this.reportForm = this.fb.group({
      name: ['', Validators.required],
      project: [this.projects[0].id, Validators.required],
      type: [this.types[0].id, Validators.required],
      format: [this.formats[0].id, Validators.required],
      record_number: ['', Validators.required],
      blind_sample_number: ['', Validators.required],
      element: ['', Validators.required],

      person_in_charge: [null, Validators.required],
    });
  }

  getFormValue(form: FormGroup): Report {
    const formValue = new Report();
    this.reportFormKeys.forEach(key => {
      formValue[key] = form.get(key).value;
    });
    return formValue;
  }

  setPatchValue(form: FormGroup, patchValue: Report): void {
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
     *TODO:提交报告数据 => 跳转页面
     *simulation：模拟方法(保存提交数据)
     **/
    this.simulation(request);
  }

  simulation(report: Report): void {
    const time = new Date().getTime();
    report.id = time;
    report.create_time = time;
    sessionStorage.removeItem('reportForm');
    const reportsJson = localStorage.getItem('reports');
    let reports: Report[];
    if (!reportsJson) {
      reports = [report];
    } else {
      reports = JSON.parse(reportsJson);
      reports.push(report);
    }
    localStorage.setItem('reports', JSON.stringify(reports));
    console.log(reports);
  }

  revert() {
    this.isSubmit = false;
    this.reportForm.reset({
      project: this.projects[0].id,
      type: this.types[0].id,
      format: this.formats[0].id,
      person_in_charge: this.reportForm.get('person_in_charge').value,
    });
  }
}

