import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ArrayUtil } from '../../core/util/array.util';
import { FileService } from '../../core/file.service';
import { WorkflowService } from '../../core/workflow.service';
import { File } from '../../common/file';
import { Project } from '../../common/project';
import { Report } from '../../common/report';
import { Workflow } from '../../common/workflow';

const types = [
  { id: 1, name: '报告', key: 'reports' },
  { id: 2, name: '合同', key: 'contracts' },
  { id: 3, name: '项目', key: 'projects' }
];

@Component({
  selector: 'app-create-workflow',
  templateUrl: './create-workflow.component.html',
  styleUrls: ['../../../assets/form.css']
})
export class CreateWorkflowComponent implements OnInit {
  Form: FormGroup;
  isSubmit: boolean;
  FormKeys: string[] = [
    'type',
    'file_id',
    'makers',
    'leader'
  ];
  projects: Project[];
  reports: Report[];
  types: any[];
  files: File[];
  type: number;
  condition: string;
  queryParams: object;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http,
    private  fb: FormBuilder,
    private  fileService: FileService,
    private  workflowService: WorkflowService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      this.type = Number(queryParams.type);
      if (!this.type) {
        this.router.navigate(['/home']);
      }
      this.getFiles(this.type);
    });
    this.types = types;
    this.createForm();
  }

  ngOnInit() {
    this.isSubmit = false;
    const FormCache = JSON.parse(sessionStorage.getItem('workflowForm'));
    if (FormCache) {
      console.log(FormCache);
      this.getFiles(this.type);
      this.setPatchValue(this.Form, FormCache);
    }
  }

  getFiles(type: number): void {
    switch (Number(type)) {
      case 1:
        this.fileService.getReports().then(reports => this.files = reports );
        break;
      case 2:
        this.fileService.getContracts().then(contracts => this.files = contracts );
        break;
      case 3:
        this.fileService.getProjects().then(projects => this.files = projects );
        break;
    }
  }

  filesChange(id: number): void {
    for (const type of types) {
      if (type.id === Number(id)) {
        this.files = this[type.key];
        this.Form.patchValue({
          file_id: null
        });
      }
    }
  }

  getTypeName(id: number): string {
    for (const type of types) {
      if (type.id === Number(id)) {
        return type.name;
      }
    }
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
    this.isSubmit = true;
    if (!form.get('file_id').value) {
      muiToast(`请选择${ this.getTypeName(form.get('type').value) }`);
      return;
    }
    const request = this.getFormValue(form);
    if (this.getTypeName(request.type) !== this.condition &&
      (request.makers.length === 0 || request.leader.length === 0)) {
      muiToast('请选择相关人员');
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
    if (this.type === 1) {
      request['pj_id'] = 1; //TODO
    }
    /**
     *TODO:提交项目申请表数据 => 跳转页面
     *simulation：模拟方法(保存提交数据)
     **/
    this.simulation(request);
  }

  simulation(workflow: Workflow): void {
    sessionStorage.removeItem('workflowForm');
    this.workflowService.createWorkflow(workflow);
    this.router.navigate(['/home']);
  }

  revert() {
    this.isSubmit = false;
    this.Form.reset({
      type: this.Form.get('type').value
    });
  }
}

