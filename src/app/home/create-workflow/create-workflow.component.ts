import { Component, OnInit, AfterViewChecked } from '@angular/core';
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

const TYPES = [
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
  isSubmit: boolean = false;
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
  queryParams: Object;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http,
    private  fb: FormBuilder,
    private  fileService: FileService,
    private  workflowService: WorkflowService
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
      this.type = Number(queryParams['type']);
      if (this.type == 1) {
        setDateTimeGroup('.dateTime');
      }
      if (!this.type) {
        this.router.navigate(['/home']);
      }
      this.getFiles(this.type);
    });
    this.types = TYPES;
    this.createForm();
  }

  ngOnInit() {
    const FormCache = JSON.parse(sessionStorage.getItem('workflowForm'));
    if (FormCache) {
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

  getTypeName(id: number): string {
    for (const type of TYPES) {
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
    if (this.isSubmit) return;
    this.isSubmit = true;
    if (!form.get('file_id').value) {
      muiToast(`请选择${ this.getTypeName(form.get('type').value) }`);
      this.isSubmit = false;
      return;
    }
    const request = this.getFormValue(form);
    if (!request.makers || !request.leader || request.makers.length === 0 || request.leader.length === 0) {
      muiToast('请选择相关人员');
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

