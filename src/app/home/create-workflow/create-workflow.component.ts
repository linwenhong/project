import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ArrayUtil } from '../../core/util/array.util';
import { FileService } from '../../core/file.service';
import { WorkflowService } from '../../core/workflow.service';
import { File } from '../../common/file';
import { Workflow } from '../../common/workflow';
import { WORKFLOW_TYPES } from '../../common/workflow-types';

@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class CreateWorkflowComponent implements OnInit {
  Form: FormGroup;
  isSubmit: boolean = false;
  FormKeys: string[] = [
    'type',
    'file_id',
    'makers',
    'leader'
  ];
  files: File[];
  type: number;
  typeName: string;
  queryParams: Object;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private fileService: FileService,
    private workflowService: WorkflowService
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      this.type = Number(queryParams['type']);
      for (const key in WORKFLOW_TYPES) {
        if (this.type == WORKFLOW_TYPES[key].value) {
          this.typeName = WORKFLOW_TYPES[key].name;
        }
      }
      if (this.type == 1) {
        setDateTimeGroup('.dateTime');
      }
      if (!this.type) {
        this.router.navigate(['/home']);
      }
      this.getFiles(this.type);
    });
    this.createForm();
  }

  get isNeedToCheck(): boolean {
    return this.type != 4 && this.type != 6;
  }

  ngOnInit() {
    const FormCache = JSON.parse(sessionStorage.getItem('workflowForm'));
    if (FormCache) {
      this.setPatchValue(this.Form, FormCache);
    }
  }

  getFiles(type: number): void {
    this.fileService.getList(type).then(fileList => this.files = fileList);
  }

  createForm(): void {
    this.Form = this.fb.group({
      type: this.type,
      file_id: [null, Validators.required],
      makers: null,
      leader: null
    });
  }

  getFormValue(form: FormGroup): Workflow {
    const formValue = new Workflow();
    this.FormKeys.forEach(key => {
      formValue[key] = form.get(key).value;
    });
    return formValue;
  }

  setPatchValue(form: FormGroup, patchValue: Workflow): void {
    form.patchValue(patchValue);
  }

  submit(form: FormGroup): void {
    if (this.isSubmit) return;
    this.isSubmit = true;
    if (!form.get('file_id').value) {
      muiToast(`请选择${ this.typeName }`);
      this.isSubmit = false;
      return;
    }
    const request = this.getFormValue(form);
    if (this.isNeedToCheck && (!request.makers || request.makers.length === 0)) {
      muiToast('请选择检测人员');
      this.isSubmit = false;
      return;
    }
    if (!request.leader || request.leader.length === 0) {
      muiToast('请选择校核人员');
      this.isSubmit = false;
      return;
    }
    this.setPatchValue(form, request);
    for (const key in request) {
      const isUsers = ArrayUtil.keyInArray(key, ['makers', 'leader']);
      if (isUsers) {
        request[key] = ArrayUtil.getWfId(request[key], key == 'makers' ? true : false);
      }
    }
    request['author'] = JSON.parse(localStorage.getItem('user')).wf_usr_id;   // 发起人
    if (this.type == 1) {
      for (const file of this.files) {
        if (request['file_id'] == file.id) {
          request['pj_id'] = file['pj_id'];
          break;
        }
      }
    }
    this.simulation(request);
  }

  simulation(workflow: Workflow): void {
    sessionStorage.removeItem('workflowForm');
    this.workflowService.createWorkflow(workflow).then( msg => {
      if (msg) {
        muiToast('新建成功');
        this.router.navigate(['/home']);
      }
    });
  }
}

