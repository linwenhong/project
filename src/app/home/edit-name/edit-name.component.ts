import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../core/user.service';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.css']
})
export class EditNameComponent implements OnInit {
  Form: FormGroup;
  isSubmit: boolean;
  FormKeys: string[] = [
    'name',
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private  fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.isSubmit = false;
  }

  createForm(): void {
    this.Form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  getFormValue(form: FormGroup): object {
    const formValue = {};
    this.FormKeys.forEach(key => {
      formValue[key] = form.get(key).value;
    });
    return formValue;
  }

  setPatchValue(form: FormGroup, patchValue: object): void {
    form.patchValue(patchValue);
  }

  submit(form: FormGroup): void {
    this.isSubmit = true;
    if (form.status === 'INVALID') {
      muiToast('请填写昵称');
      return;
    }
    const request = this.getFormValue(form);
    this.setPatchValue(form, request);
    console.log(request);
    /**
     *TODO:提交 => 跳转页面
     *simulation：模拟方法(保存提交数据)
     **/
    this.simulation();
  }

  simulation(): void {
    this.router.navigate(['/home/my']);
  }
}

