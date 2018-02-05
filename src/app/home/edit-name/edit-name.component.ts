import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../core/user.service';
import { User } from '../../common/user';

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

  getFormValue(form: FormGroup): User {
    const formValue = new User();
    this.FormKeys.forEach(key => {
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
      muiToast('请填写昵称');
      return;
    }
    const request = this.getFormValue(form);
    this.setPatchValue(form, request);
    this.userService.editName(request).then( user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home/my']);
      }
    });
  }
}
