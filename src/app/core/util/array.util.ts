export class ArrayUtil {

  static getKeys(datas: any[], key: string = 'id'): any[] {
    const keys: any[] = [];
    datas.forEach(data => keys.push(data[key]));
    return keys;
  }

  static keyInDatas(key: string, datas: string[]): boolean {
    for (const data of datas) {
      if (data === key) {
        return true;
      }
    }
    return false;
  }

}
