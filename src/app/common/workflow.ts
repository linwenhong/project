import { User } from './user';

export class Workflow {
  id: number;
  type: number;
  file_id: number;             /*合同/报告/项目 id*/
  author: number;             /*发起人*/
  makers: User[];            /*检测人*/
  leader: User[];             /*下一步审核人*/

  create_time: number;
  pj_id: number;              /*仅报告使用*/
}
