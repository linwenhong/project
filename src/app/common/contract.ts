export class Contract {
  id: number;
  project_name: string;   /*工程名称*/
  contract_num: string;   /*合同编号*/
  party_a: string;   /*甲方名称*/
  sign_date: string;   /*签订日期*/
  limit_time: string;   /*工期*/
  finish_time: string;   /*预计完成时间*/
  entry_time: string;   /*要求进场时间*/
  contract_amount: string;   /*合同金额*/
  contract_files: string;   /*合同文件*/
  status: string;   /*合同状态*/
  dp_id: string;   /*负责部门*/
  people: string;   /*负责人*/
  contract_type: string;   /*合同类型*/
  contract_item: string;   /*检测项目名称*/
  contract_params: string;   /*检测项目参数*/
  audit: string;   /*备注*/
}
