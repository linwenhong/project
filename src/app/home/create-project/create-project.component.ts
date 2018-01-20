import { Component, OnInit, AfterViewChecked } from '@angular/core';
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
export class CreateProjectComponent implements OnInit, AfterViewChecked {
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

    'department',
    'approach',
    'complete',
    'person_in_charge',
    'manager',

    // 'author',
    // 'checker',
    // 'examine',
    // 'leader'
  ];
  users: User[];

  canSetDateTimeGroup: boolean = true;

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

  ngAfterViewChecked() {
    if (this.canSetDateTimeGroup && this.projectForm) {
      this.canSetDateTimeGroup = false;
      setDateTimeGroup('.dateTime');
    }
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

      department: ['', Validators.required],
      approach: '',
      complete: '',
      person_in_charge: [null, Validators.required],
      manager: [null, Validators.required],
      //
      // author: [null, Validators.required],
      // checker: [null, Validators.required],
      // examine: [null, Validators.required],
      // leader: [null, Validators.required],
    });
  }

  getFormValue(form: FormGroup): Project {
    const formValue = new Project();
    this.projectFormKeys.forEach(key => {
      if (key !== 'approach' && key !== 'complete') {
        formValue[key] = form.get(key).value;
      } else {
        formValue[key] = getDateTime('#' + key);
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
    if (!getDateTime('#approach') || !getDateTime('#complete')) {
      muiToast('请选择相关时间');
      return;
    }
    const request = this.getFormValue(form);
    this.setPatchValue(form, request);
    console.log(request);
    /**
     *TODO:提交项目申请表数据 => 跳转页面
     *simulation：模拟方法
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
    this.projectForm.reset({
      person_in_charge: this.projectForm.get('person_in_charge').value,
      manager: this.projectForm.get('manager').value,
      // author: this.projectForm.get('author').value,
      // checker: this.projectForm.get('checker').value,
      // examine: this.projectForm.get('examine').value,
      // leader: this.projectForm.get('leader').value
    });
  }
}
