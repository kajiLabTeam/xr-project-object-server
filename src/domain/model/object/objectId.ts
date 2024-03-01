import { ulid } from "ulid";

export class ObjectId {
  private _id: string;

  constructor(id = ulid()) {
    this._id = id;
  }
}
