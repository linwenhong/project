import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Project } from '../../common/project';
import { User } from '../../common/user';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  isSubmit: boolean = false;
  projectFormKeys: string[] = [
    'name',
    'place',
    'contacts',
    'telephone',
    'contract_number',
    'entrustment_unit',
    'entrustment_number',
    'entrustment_project',
    'testing_requirements',
    'information_of_the_client',
    'author',
    'checker',
    'examine',
    'leader'
  ];
  users: User[];

  constructor(
    private router: Router,
    private http: Http,
    private  fb: FormBuilder
  ) {
    this.http.get('assets/json/users.json').toPromise().then(response => {
      this.users = response.json();
      this.createForm();

      const projectFormCache = JSON.parse(sessionStorage.getItem('projectForm'));
      if (projectFormCache) {
        this.setPatchValue(this.projectForm, projectFormCache);
      }
    });
  }

  ngOnInit() {

  }

  createForm(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      place: ['', Validators.required],
      contacts: ['', Validators.required],
      telephone: ['', Validators.required],
      contract_number: ['', Validators.required],
      entrustment_unit: ['', Validators.required],
      entrustment_number: ['', Validators.required],
      entrustment_project: ['', Validators.required],
      testing_requirements: ['', Validators.required],
      information_of_the_client: ['', Validators.required],
      author: this.users[0].id,
      checker: this.users[0].id,
      examine: this.users[0].id,
      leader: this.users[0].id
    });
  }

  getFormValue(form: FormGroup): Project {
    const formValue = new Project();
    this.projectFormKeys.forEach(key => formValue[key] = form.get(key).value);
    return formValue;
  }

  setPatchValue(form: FormGroup, patchValue: Project): void {
    form.patchValue(patchValue);
  }

  submit(form: FormGroup): void {
    this.isSubmit = true;
    if (form.status === 'INVALID') {
      notify('info', '必要信息缺少', '请完善信息!');
      return;
    }
    const request = this.getFormValue(form);
    this.setPatchValue(form, request);
    console.log(request);
    /**
     TODO:提交项目申请表数据 => 跳转页面
    **/
  }

  revert() {
    this.isSubmit = false;
    this.projectForm.reset({
      author: this.projectForm.get('author').value,
      checker: this.projectForm.get('checker').value,
      examine: this.projectForm.get('examine').value,
      leader: this.projectForm.get('leader').value
    });
  }
}
