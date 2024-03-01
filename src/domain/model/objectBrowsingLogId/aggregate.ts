import { ObjectId } from "../object/objectId";
import { UserId } from "../user/userId";
import { ObjectBrowsingLogId } from "./objectBrowsingLogId";

export class ObjectBrowsingLogAggregate {
  private _id: ObjectBrowsingLogId;
  private _userId: UserId;
  private _objectId: ObjectId;

  constructor(
    _id: ObjectBrowsingLogId = new ObjectBrowsingLogId(),
    _userId: UserId,
    _objectId: ObjectId
  ) {
    this._id = _id;
    this._userId = _userId;
    this._objectId = _objectId;
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  get objectId() {
    return this._objectId;
  }
}
