import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../core/user.service';
import { User } from '../../common/user';

@Component({
  selector: 'app-edit-passwrod',
  templateUrl: './edit-passwrod.component.html',
  styleUrls: ['./edit-passwrod.component.css']
})
export class EditPasswrodComponent implements OnInit {
  Form: FormGroup;
  isSubmit: boolean;
  FormKeys: string[] = [
    'old_password',
    'password',
    'confirm',
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
      old_password: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
    });
  }

  getFormValue(form: FormGroup): User {
    const formValue = new User();
    this.FormKeys.forEach(key => {
      if (key === 'confirm') {
        return;
      }
      formValue[key] = form.get(key).value;
    });
    return formValue;
  }

  setPatchValue(form: FormGroup, patchValue: User): void {
    form.patchValue(patchValue);
  }

  submit(form: FormGroup): void {
    this.isSubmit = true;
    if (form.status === 'INVALID') {
      muiToast('请填写密码');
      return;
    }
    if (form.get('password').value !== form.get('confirm').value) {
      muiToast('两次输入的密码不同');
      return;
    }
    const request = this.getFormValue(form);
    this.setPatchValue(form, request);
    this.userService.editPassword(request).then( () => this.router.navigate(['/home/my']) );
  }
}
