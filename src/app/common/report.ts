export class Report {
  id: number;
  name: string;
  project: number;              /*项目id*/
  type: number;                 /*报告类型id*/
  format: number;               /*报告格式id*/
  record_number: string;        /*样品/记录编号*/
  blind_sample_number: string;  /*盲样编号*/
  element: string;              /*要素*/

  person_in_charge: number;     /*负责人*/

  create_time: number;
}
