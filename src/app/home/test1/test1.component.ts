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
  projectForm: Project = {
    name: '测试',
    number: 2018011216060001,
    director: '测试组001'
  };
  heroForm: FormGroup;
  isSubmit: boolean = false;

  constructor(
    private testSerivce: TestService,
    private  fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    // this.testSerivce.get();
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
    this.setPatchValue(form);
  }

  revert() {
    this.heroForm.reset();
  }
}
