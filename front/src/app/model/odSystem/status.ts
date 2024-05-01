export class Status {
  statusId: number;
  status: string;

  constructor(statusId: number, status: string) {
    this.statusId = statusId;
    this.status = status;
  }

  public static fromJson(json: Status): Status {
    return new Status(json.statusId, json.status);
  }

  static initializeStatus(json: {status: Status | undefined}): Status | undefined {
    let status: Status | undefined;
    if(json.status != undefined) {
      status = Status.fromJson(json.status);
    }
    return status;
  }
}

