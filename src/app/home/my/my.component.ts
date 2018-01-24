import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { User } from '../../common/user';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css', '../../../assets/form.css']
})
export class MyComponent implements OnInit {
  Form: FormGroup;
  isSubmit: boolean;
  FormKeys: string[] = [
    'username',
    'name',
    'dp_id',
    'avatar',
    'sign_img',
  ];
  user: User;

  constructor(
    private router: Router,
    private http: Http,
    private  fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.isSubmit = false;
    const FormCache = JSON.parse(localStorage.getItem('my'));
    if (FormCache) {
      this.setPatchValue(this.Form, FormCache);
      this.user = FormCache;
    }
  }

  createForm(): void {
    this.Form = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      dp_id: ['', Validators.required],
      avatar: [''],
      sign_img: [''],
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
      muiToast('请完善提交信息');
      return;
    }
    const request = this.getFormValue(form);
    this.setPatchValue(form, request);
    console.log(request);
    /**
     *TODO:提交项目申请表数据 => 跳转页面
     *simulation：模拟方法(保存提交数据)
     **/
    this.simulation(request);
  }

  simulation(user: User): void {
    const time = new Date().getTime();
    user.id = time;

    localStorage.setItem('my', JSON.stringify(user));
    muiToast('修改成功');
    this.isSubmit = false;
  }

}
