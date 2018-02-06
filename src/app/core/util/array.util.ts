export class ArrayUtil {

  static getKeys(datas: any[], key: string = 'id'): any[] {
    const keys: any[] = [];
    datas.forEach(data => keys.push(data[key]));
    return keys;
  }

  /**
  *  获取用户wf_usr_id(传入值类型为User[])
  * */
  static getWfId(datas: any[], isMultiselect: boolean = false): any {
    const ids: any[] = [];
    datas.forEach(data => ids.push(data['wf_usr_id']));
    if (isMultiselect) {
      return ids;   // 返回数组
    }
    return ids[0];    // 返回单个id
  }

  static keyInArray(key: string, datas: string[]): boolean {
    for (const data of datas) {
      if (data === key) {
        return true;
      }
    }
    return false;
  }

}
