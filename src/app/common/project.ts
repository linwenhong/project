export class Project {
  name: string;
  place: string;    /*工程地点*/
  contacts: string;     /*联系人*/
  telephone: number;    /*联系电话*/
  contract_number: string;    /*合同编号*/
  entrustment_unit: string;   /*委托单位*/
  build_unit: string;   /*建设单位*/
  design_unit: string;   /*设计单位*/
  doing_unit: string;   /*施工单位*/
  check_unit: string;   /*监理单位*/
  project_detail: string;   /*工程概况*/
  testing_requirements: string;   /*检验检测要求和依据*/
  information_of_the_client: string;    /*委托方提供的资料*/

  department: string;
  approach: string;
  complete: string;
  person_in_charge: number;
  manager: number;

  id: number;
  create_time: number;
  progress_index: number;

  is_person_in_charge_pass: boolean;
  is_manager_pass: boolean;
  person_in_charge_pass_remake: string;
  manager_pass_remake: string;
}
