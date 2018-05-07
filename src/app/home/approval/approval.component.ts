import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WorkflowService } from '../../core/workflow.service';
import { ArrayUtil } from '../../core/util/array.util';
import { TASK } from  '../../common/task';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css', '../../../assets/form.css']
})
export class ApprovalComponent implements OnInit, AfterViewChecked {
  id: number;
  type: number;
  option: boolean;
  optionTest: string;
  project: Object;
  projects: Object[];
  url: string;
  request: any = {};
  leader: Object;
  queryParams: any;
  canNext: boolean = false;
  task: string;
  curTask: string;
  fileName: string;
  page: number;
  canSelectTime: boolean = true;
  isSubmit: boolean = false;
  cacheData: Object = {};
  tas_uid: string;
  isAuthorTask: boolean = false;

  constructor(
    private workflowService: WorkflowService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  get canSelectFile(): boolean {
    return this.option && this.type != 3 && this.type != 4;
  }

  get canEditOption(): boolean {
    return !this.isAuthorTask && this.option && this.tas_uid != '7096257625a6fd9e6e327b7056575944' && this.tas_uid != '7591958415a6fda5eb32403071634539'
      || !this.option;
  }

  get signTime(): string {
    if (getDateTime('#time0')) {
      this.cacheData['time'] = getDateTime('#time0')
    }
    return this.cacheData['time'];
  }

  get finishTime(): string {
    if (getDateTime('#finish_time')) {
      this.cacheData['finish_time'] = getDateTime('#finish_time')
    }
    return this.cacheData['finish_time'];
  }

  get entryTime(): string {
    if (getDateTime('#entry_time')) {
      this.cacheData['entry_time'] = getDateTime('#entry_time')
    }
    return this.cacheData['entry_time'];
  }

  ngAfterViewChecked() {
    if (this.type == 1 && this.fileName && this.canSelectTime) {
      this.canSelectTime = false;
      setDateTimeGroup('#time');
    }

    if (this.type == 3 && this.canSelectTime) {
      this.canSelectTime = false;
      setDateTimeGroup('#finish_time');
      setDateTimeGroup('#entry_time');
    }
  }

  ngOnInit() {
    setDateTimeGroup('#time0');
    const data = JSON.parse(sessionStorage.getItem('cacheData'));
    this.cacheData['remake'] = data ? data['remake'] : '';
    this.cacheData['time'] = data ? data['time'] : this.getNowDate();
    this.cacheData['finish_time'] = data ? data['finish_time'] : this.getNowDate();
    this.cacheData['entry_time'] = data ? data['entry_time'] : this.getNowDate();
    this.leader = JSON.parse(sessionStorage.getItem('leader')) || {};
    this.activatedRoute.queryParams.subscribe(queryParams => {
      sessionStorage.setItem('queryParams', JSON.stringify(queryParams));
      this.queryParams = JSON.stringify(queryParams);
      this.id = queryParams['id'];
      this.type = queryParams['type'];
      this.url = queryParams['url'];
      this.option = queryParams['option'] === 'true' ? true : false;
      this.optionTest = this.option ? '同意' : '拒绝';
      this.request = {
        type: queryParams['type'],
        index: queryParams['index'],
        caseId: queryParams['id'],
        agree: this.option ? 1 : 0
      };
      if (
        !ArrayUtil.keyInArray(queryParams['index'], [
          '6965696805a7131ea0dfde4035064095',
          '2803881535a7285f4734977045032333',
          '3404235605a5713caa59782069577955',
          '5791135725aa790bb709a11034157136',
          '8385939455aa62951e73528049582531',
          '8291429775aa78c088bb812015401490'
        ])
      ) {
        this.canNext = true;
        this.task = queryParams['task'];
        this.curTask = queryParams['cur_task'];
      }

      this.tas_uid = queryParams['index'];
      if (TASK[this.type - 1][this.tas_uid] == 1) this.isAuthorTask = true;
      if (this.option && (this.tas_uid == '7096257625a6fd9e6e327b7056575944' || this.tas_uid == '7591958415a6fda5eb32403071634539')) {
        let array = [];
        array[1] = { op1: 1, text1: ''};
        array[2] = { op2: 1, text2: ''};
        array[3] = { op3: 1, text3: ''};
        array[4] = { op4: 1, text4: ''};
        array[5] = { op5: 1, text5: ''};
        this.cacheData['optional'] = data ? data['optional'] : array;
        if (this.tas_uid == '7591958415a6fda5eb32403071634539' && !data) {
          this.cacheData['optional'][5].op5 = 0;
          this.cacheData['optional'][6] = { op6: 1, text6: ''};
        }
      }
      sessionStorage.removeItem('cacheData');
    });
  }

  options(option: boolean): void {
    if (this.isSubmit) return;
    this.isSubmit = true;
    if (option) {
      if (this.tas_uid == '6846831325a7285cc7818a5005400886') {
        if (!this.leader['people'] || this.leader['people'].length == 0) {
          muiToast('请选择负责人');
          this.isSubmit = false;
          return;
        }
      }
      if (this.option && this.canNext) {
        if (!this.leader['leader'] || this.leader['leader'].length == 0) {
          muiToast('请选择审核人');
          this.isSubmit = false;
          return;
        }
        this.request['leader'] = ArrayUtil.getWfId(this.leader['leader']);
      }
      this.request['description'] = this.cacheData['remake'] || this.optionTest;
      if (!this.option) this.request['description'] = this.curTask + ': ' + this.request['description'];
      if (this.type == 1 && this.fileName && !this.page) {
        muiToast(`请选择输入报告页数`);
        this.isSubmit = false;
        return;
      }
      if (this.type == 1 && this.fileName && !getDateTime('#time')) {
        muiToast('请选择相关时间');
        this.isSubmit = false;
        return;
      }
      if (this.fileName) {
        if (this.type == 1) {
          this.request['page'] = this.page;
          this.request['time'] = getDateTime('#time');
        }
        this.request['report_name'] = fileUpload(environment.api_url);  // 文件上传
      }
      if (this.tas_uid == '7096257625a6fd9e6e327b7056575944') {
        this.request['checker_optional'] = this.cacheData['optional'];
      }
      if (this.tas_uid == '7591958415a6fda5eb32403071634539') {
        this.request['for_optional'] = this.cacheData['optional'];
      }
      if (this.tas_uid == '6846831325a7285cc7818a5005400886') {
        this.request['finish_time'] = this.cacheData['finish_time'];
        this.request['entry_time'] = this.cacheData['entry_time'];
        this.request['dp_id'] = JSON.parse(sessionStorage.getItem('leader'))['people'][0].dp_id
        this.request['people'] = ArrayUtil.getWfId(this.leader['people']);
      }
      this.request['sign_time'] = getDateTime('#time0');
      this.workflowService.examine(this.request).then(() => this.router.navigate(['/home/project-list']));

    } else {
      this.router.navigate([this.url]);
    }
  }

  fileChange(): void {
    if (!getFileName()) this.canSelectTime = true;
    this.fileName = getFileName();
  }

  select(index: number): void {
    this.cacheData['optional'][index]['op' + index] = this.cacheData['optional'][index]['op' + index] == 1 ? 0 : 1;
  }

  getNowDate(): string {
    const Dates = new Date();
    const year: number = Dates.getFullYear();
    const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
    const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
    return year + '-' + month + '-' + day;
  }
}
