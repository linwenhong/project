import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {
  image_src: string;

  constructor(
  ) { }

  ngOnInit() {
    jSignatureInit();
  }

  jSignature(): void {
    this.image_src = jSignature();
    console.log(this.image_src);
  }

  jSignatureReset(): void {
    this.image_src = '';
    jSignatureReset();
  }
}
