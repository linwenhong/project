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
  request: Project;
  test: any = {};

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

  setPatchValue(form: FormGroup): void {
    form.patchValue({
      name: form.get('name').value,
      place: form.get('place').value,
      contacts: form.get('contacts').value,
      telephone: form.get('telephone').value,
      contract_number: form.get('contract_number').value,
      entrustment_unit: form.get('entrustment_unit').value,
      entrustment_number: form.get('entrustment_number').value,
      entrustment_project: form.get('entrustment_project').value,
      testing_requirements: form.get('testing_requirements').value,
      information_of_the_client: form.get('information_of_the_client').value
    });
  }

  submit(form: FormGroup): void {
    this.isSubmit = true;
    if (form.status === 'INVALID') {
      notify('info', '必要信息缺少', '请完善信息!');
      return;
    }
    this.setPatchValue(form);

    this.request = {
      name: form.get('name').value,
      place: form.get('place').value,
      contacts: form.get('contacts').value,
      telephone: form.get('telephone').value,
      contract_number: form.get('contract_number').value,
      entrustment_unit: form.get('entrustment_unit').value,
      entrustment_number: form.get('entrustment_number').value,
      entrustment_project: form.get('entrustment_project').value,
      testing_requirements: form.get('testing_requirements').value,
      information_of_the_client: form.get('information_of_the_client').value
    };
    console.log(this.request);
  }

  revert() {
    this.isSubmit = false;
    this.projectForm.reset();
  }
}
