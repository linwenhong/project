import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {
  image_src: string;
  remake: string;
  isSign: boolean = false;

  constructor(
  ) { }

  ngOnInit() {
    jSignatureInit();
  }

  jSignature(): void {
    this.image_src = jSignature();
    if (this.image_src) {
      this.isSign = true;
    }
  }

  jSignatureReset(): void {
    this.image_src = '';
    this.isSign = false;
    jSignatureReset();
  }
  // approve
  submit(): void {
    if (!this.isSign) {
      muiToast('请进行签名确认!');
      return;
    }
    const request = {
      'approve': '同意',
      'remake': this.remake,
      'sign': this.image_src
    };
    console.log(request);
  }
}
