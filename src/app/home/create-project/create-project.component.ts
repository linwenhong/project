import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TestService } from '../../core/test.service';
import { Project } from '../../common/project';

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
    'information_of_the_client'
  ];

  constructor(
    private testSerivce: TestService,
    private  fb: FormBuilder
  ) {
    this.createForm();
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
      information_of_the_client: ['', Validators.required]
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
  }

  revert() {
    this.isSubmit = false;
    this.projectForm.reset();
  }
}
