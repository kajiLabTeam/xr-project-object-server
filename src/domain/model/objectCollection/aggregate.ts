import { ObjectId } from "../object/objectId";
import { ObjectCollectionId } from "./objectCollection";

export class ObjectCollectionAggregate {
  private _id: ObjectCollectionId;
  private _object_ids: ObjectId[];

  constructor(
    _id: ObjectCollectionId = new ObjectCollectionId(),
    _object_ids: ObjectId[]
  ) {
    this._id = _id;
    this._object_ids = _object_ids;
  }

  get id() {
    return this._id;
  }

  get object_ids() {
    return this._object_ids;
  }
}
