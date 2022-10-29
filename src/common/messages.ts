export class CommonMessage {
  public static email_existed = 'Email này đã tồn tại';
  public static email_invalid_format = 'Email không đúng định dạng';
  public static login_fail = 'Tài khoản hoặc mật khẩu không đúng';

  static getMessageEmailExisted() {
    return `${this.email_existed}`;
  }

  static getMessageMaxLength(value: string, maxLength: string) {
    return `${value} tối đa ${maxLength} ký tự`;
  }

  static getMessageEmailInvalid() {
    return `${this.email_invalid_format}`;
  }

  static getMessageLoginFail() {
    return `${this.login_fail}`;
  }
}
