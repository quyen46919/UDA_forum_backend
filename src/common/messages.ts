export class CommonMessage {
  public static email_existed = 'Email này đã tồn tại';
  public static email_invalid_format = 'Email không đúng định dạng';
  public static login_fail = 'Tài khoản hoặc mật khẩu không đúng';
  public static logged_account =
    'Tài khoản hiện đang đăng nhập ở một thiết bị khác';
  public static not_log_in_account = 'Tài khoản chưa đăng nhập';
  public static invalid_token = 'Token không hợp lệ';
  public static invalid_user = 'Tài khoản không tồn tại';
  public static invalidMember = 'Thành viên này không tồn tại trong nhóm';
  public static existedMember = 'Nguời này đang là thành viên nhóm';
  public static updateFailed = 'Cập nhật thất bại do có lỗi xảy ra';

  static getMessageEmailExisted = () => `${this.email_existed}`;
  static getMessageMaxLength = (value: string, maxLength: string) =>
    `${value} tối đa ${maxLength} ký tự`;
  static getMessageEmailInvalid = () => `${this.email_invalid_format}`;
  static getMessageLoginFail = () => `${this.login_fail}`;
  static getMessageLoggedAccount = () => `${this.logged_account}`;
  static getMessageInvalidToken = () => `${this.invalid_token}`;
  static getMessageNotLogInAccount = () => `${this.invalid_token}`;
  static getMessageInvalidAccount = () => `${this.invalid_user}`;
  static getMessageInvalidMember = () => `${this.invalidMember}`;
  static getMessageExistedMember = () => `${this.existedMember}`;
  static getMessageUpdateFailed = () => `${this.updateFailed}`;

  static maxLength = (field: string, length: number) =>
    `${field} tối đa ${length} ký tự`;
  static minLength = (field: string, length: number) =>
    `${field} tối thiểu ${length} ký tự`;
  static requiredField = (field: string) =>
    `Trường ${field} là thông tin bắt buộc`;
  static invalidFormatField = (field: string) =>
    `Trường ${field} không đúng định dạng`;
}
