import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TestService } from "../../core/test.service";
import { Project } from "../../common/project";

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit {
  heroForm: FormGroup;
  isSubmit: boolean = false;
  request: Project;

  constructor(
    private testSerivce: TestService,
    private  fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm(): void {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      director: ['', Validators.required]
    });
  }

  setPatchValue(form: FormGroup): void {
    form.patchValue({
      name: form.get('name').value,
      number: form.get('number').value,
      director: form.get('director').value
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
      number: form.get('number').value,
      director: form.get('director').value
    };
    console.log(this.request);
    this.testSerivce.post(this.request);
  }

  revert() {
    this.isSubmit = false;
    this.heroForm.reset();
  }
}
