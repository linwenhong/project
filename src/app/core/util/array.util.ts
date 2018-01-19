export class ArrayUtil {

  static getKeys(datas: any[], key: string = 'id'): any[] {
    const keys: any[] = [];
    datas.forEach(data => keys.push(data[key]));
    return keys;
  }

}
