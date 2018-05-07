/*
  CASE_FORM_DATA[1] 中的1为 workflow type 值, 如：1为报告, 2为合同
  CASE_FORM_DATA 中的 key 属性均指 workflow 详情的 data 对象的 key
  .groups 为html页面input框, 如在页面以input框显示 data.name,则在 groups 中添加 { name: 'input标题', key: 'name' }
  .paragraph 为html页面textarea
  .files 为html页面相关文件url
  .inspectors 工作流发起人与审核人
*/
export const CASE_FORM_DATA = {
  '1': {
    groups: [
      { name: '报告名称', key: 'name' },
      { name: '项目名', key: 'project_name' },
      { name: '报告类型', key: 'rp_type' },
      { name: '报告格式', key: 'rp_format' },
      { name: '样品/记录编号', key: 'sample' },
      { name: '盲样编号', key: 'blind_sample' },
      { name: '负责人', key: 'maker' },
    ],
    files: [
      { name: '报告文件', key: 'report_name' }
    ],
    inspectors: [
      {
        procedureIndex: 1,
        key: 'author',
        text: '报告编制'
      },
      {
        procedureIndex: 2,
        key: 'checker',
        text: '报告校验'
      },
      {
        procedureIndex: 3,
        key: 'examine',
        text: '报告审核'
      },
      {
        procedureIndex: 4,
        key: 'leader',
        text: '报告批准'
      }
    ]
  },

  '2': {
    groups: [
      { name: '工程名称', key: 'project_name' },
      { name: '合同编号', key: 'contract_num' },
      { name: '甲方名称', key: 'party_a' },
      { name: '签订日期', key: 'sign_date' },
      { name: '工期', key: 'limit_time' },
      { name: '合同金额', key: 'contract_amount' },
      { name: '负责部门', key: 'dp_id' },
      { name: '合同类型', key: 'contract_type' },
    ],
    files: [
      { name: '合同文件', key: 'contract_files' }
    ],
    inspectors: [
      {
        procedureIndex: 1,
        key: 'author',
        text: '生产经营部新建'
      },
      {
        procedureIndex: 2,
        key: 'checker',
        text: '生产经营部核查'
      },
      {
        procedureIndex: 3,
        key: 'for_instance',
        text: '检测部门经理详审'
      },
      {
        procedureIndex: 4,
        key: 'manage_instance',
        text: '副总经理详审核'
      },
      {
        procedureIndex: 5,
        key: 'examine',
        text: '总经理审核'
      },
      {
        procedureIndex: 6,
        key: 'leader',
        text: '董事长批准'
      }
    ]
  },

  '3': {
    groups: [
      { name: '项目名称', key: 'project_name' },
      { name: '工程地点', key: 'place' },
      { name: '联系人', key: 'contacts' },
      { name: '联系电话', key: 'telephone' },
      { name: '合同编号', key: 'contract_number' },
      { name: '委托单位', key: 'entrustment_unit' },
      { name: '建设单位', key: 'build_unit' },
      { name: '设计单位', key: 'design_unit' },
      { name: '施工单位', key: 'doing_unit' },
      { name: '监理单位', key: 'check_unit' },
      { name: '工程概况', key: 'project_detail' },
      { name: '检验检测要求和依据', key: 'testing_requirements' },
      { name: '委托方提供的资料', key: 'information_of_the_client' },
    ],
    files: [],
    inspectors: [
      {
        procedureIndex: 1,
        key: 'author',
        text: '生产经营部新建'
      },
      {
        procedureIndex: 2,
        key: 'checker',
        text: '检验部门审核项目'
      },
      {
        procedureIndex: 3,
        key: 'leader',
        text: '领导批准'
      }
    ]
  },

  '4': {
    groups: [
      { name: '项目名称', key: 'project_name' },
      { name: '培训时间', key: 'training_time' },
      { name: '申请人', key: 'applicant' },
      { name: '申请部门', key: 'department' },
      { name: '培训地点', key: 'place' },
      { name: '交通方式', key: 'transport' },
      { name: '培训目标', key: 'target_for_training' },
      { name: '培训人数', key: 'num_of_people' },
      { name: '总花费', key: 'total_cost' },
    ],
    files: [],
    paragraph: [
      { name: '培训学员', key: 'trainees' },
      { name: '培训内容', key: 'content' },
    ],
    inspectors: [
      {
        procedureIndex: 1,
        key: 'author',
        text: '发起人'
      },
      {
        procedureIndex: 2,
        key: 'for_instance',
        text: '部门意见'
      },
      {
        procedureIndex: 3,
        key: 'checker',
        text: '办公室意见'
      },
      {
        procedureIndex: 4,
        key: 'examine',
        text: '分管领导意见'
      },
      {
        procedureIndex: 5,
        key: 'leader',
        text: '总经理意见'
      }
    ]
  },

  '5': {
    groups: [
      { name: '报告名称', key: 'name' },
      { name: '报告编号', key: 'rp_number' },
      { name: '日期', key: 'time' },
    ],
    files: [
      { name: '报告文件', key: 'report_name' }
    ],
    inspectors: [
      {
        procedureIndex: 1,
        key: 'author',
        text: '报告编制'
      },
      {
        procedureIndex: 2,
        key: 'examine',
        text: '报告审核'
      },
      {
        procedureIndex: 3,
        key: 'leader',
        text: '报告批准'
      }
    ]
  },

  '6': {
    groups: [
      { name: '采购申请标题', key: 'project_name' },
      { name: '申请部门', key: 'department' },
      { name: '申请时间', key: 'pur_time' },
      { name: '购置原因', key: 'reason' },
    ],
    files: [],
    inspectors: [
      {
        procedureIndex: 1,
        key: 'author',
        text: '发起人'
      },
      {
        procedureIndex: 2,
        key: 'checker',
        text: '部门负责人'
      },
      {
        procedureIndex: 3,
        key: 'examine',
        text: '技术负责人'
      },
      {
        procedureIndex: 4,
        key: 'leader',
        text: '总经理'
      }
    ]
  }
};
