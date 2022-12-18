import { UtilsCore } from 'commander-core';
// import CryptoJS from 'crypto-js';
// import { splitTo } from '../../common/helpers';

export class Utils extends UtilsCore {
  private static _instance: Utils;

  // public splitTo = splitTo;

  public static get instance() {
    if (this._instance) {
      return this._instance;
    }

    return (this._instance = new Utils());
  }

  public parse2Int(str: string) {
    const $num = str.replace(/([0-9\.]+)([kк]+)*/gi, (_, num: string, replacer?: string) => {
      const $num = Number(num);
      if (!replacer) return $num.toString();

      const zeros = replacer.replace(/[кk]/gi, '000');
      return ($num * Number(`1${zeros}`)).toString();
    });

    const int = parseInt($num);
    return isNaN(int) ? 0 : int;
  }

  // public getRandomInt(min: number, max: number, seed?: string): number {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   if (seed) {
  //     const hash = CryptoJS.SHA256(seed);
  //     return (parseInt(hash.toString(CryptoJS.enc.Hex), 16) % (max - min + 1)) + min;
  //   }
  //   return Math.floor(Math.random() * (max - min)) + min;
  // }
}
