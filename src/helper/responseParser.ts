interface IAppResponse {
  statusCode?: number;
  result: "success" | "error";
  message?: string;
  data?: any;
}

export class AppResponse {
  public readonly statusCode: number | undefined;
  public readonly result: string;
  public readonly message: string | undefined;
  public readonly data: any | undefined;

  constructor({
    statusCode = 200,
    result = "success",
    message,
    data,
  }: IAppResponse) {
    this.statusCode = statusCode;
    this.result = result;
    this.message = message;
    this.data = data;
  }
}
