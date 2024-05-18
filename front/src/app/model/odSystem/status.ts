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
}

