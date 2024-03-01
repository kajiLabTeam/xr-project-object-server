import { ObjectId } from "./objectId";
import { SpotId } from "./spotId";
import { SignedUrl } from "./signedUrl";
import { UserId } from "../user/userId";

export class ObjectAggregate {
  private _id: ObjectId;
  private _posterId: UserId;
  private _spotId: SpotId;
  private _signedUrl: SignedUrl;
  constructor(
    _id: ObjectId = new ObjectId(),
    _posterId: UserId,
    _spotId: SpotId,
    _signedUrl: SignedUrl
  ) {
    this._id = _id;
    this._posterId = _posterId;
    this._spotId = _spotId;
    this._signedUrl = _signedUrl;
  }

  get id() {
    return this._id;
  }

  get posterId() {
    return this._posterId;
  }

  get spotId() {
    return this._spotId;
  }

  get signedUrl() {
    return this._signedUrl;
  }
}
