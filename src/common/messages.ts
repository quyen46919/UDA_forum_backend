export class CommonMessage {
  public static email_existed = 'Email này đã tồn tại';
  public static email_invalid_format = 'Email không đúng định dạng';
  public static login_fail = 'Tài khoản hoặc mật khẩu không đúng';
  public static logged_account =
    'Tài khoản hiện đang đăng nhập ở một thiết bị khác';
  public static invalid_token = 'Token không hợp lệ';

  static getMessageEmailExisted = () => `${this.email_existed}`;
  static getMessageMaxLength = (value: string, maxLength: string) =>
    `${value} tối đa ${maxLength} ký tự`;
  static getMessageEmailInvalid = () => `${this.email_invalid_format}`;
  static getMessageLoginFail = () => `${this.login_fail}`;
  static getMessageLoggedAccount = () => `${this.logged_account}`;
  static getMessageInvalidToken = () => `${this.invalid_token}`;
}
