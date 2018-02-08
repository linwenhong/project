export class Report {
  id: number;
  name: string;
  project_name: number;             /*项目名*/
  rp_type: number;                 /*报告类型*/
  rp_format: number;               /*报告格式*/
  sample: string;                 /*样品/记录编号*/
  blind_sample: string;           /*盲样编号*/
  maker: number;                 /*负责人*/

  create_time: number;
}
