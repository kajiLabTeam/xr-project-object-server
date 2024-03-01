import { UserId } from "./userId";

export class UserAggregate {
  private _id: UserId;

  constructor(_id: UserId = new UserId()) {
    this._id = _id;
  }

  get id() {
    return this._id;
  }
}
