import { User } from './user';

export class Workflow {
  id: number;
  create_time: number;
  type: number;
  fileId: number;             /*合同/报告/项目 id*/

  testing_person: User[];     /*检测人*/
  verifying_person: User[];   /*校核人*/
  initiator: number;          /*发起人*/

  person_in_charge: User[];   /*部门负责人*/
  manager: User[];            /*总(副总)经理*/
}
