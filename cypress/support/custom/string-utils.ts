export class StringUtils {
  static covertAllBlankToNull(value: string): string {
    if (!value || value == undefined || value == null || value.trim() == '') {
      return null;
    }

    return value;
  }

  static compareAllEmpty(a: string, b: string): boolean {
    const aContent = this.covertAllBlankToNull(a);
    const bContent = this.covertAllBlankToNull(b);

    return aContent == bContent;
  }
}
