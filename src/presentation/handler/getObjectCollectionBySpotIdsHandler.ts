import express, { Request, Response } from 'express';

import { ObjectAggregate } from '../../domain/model/object/aggregate';
import { UserAggregate } from '../../domain/model/user/aggregate';
import { GetObjectCollectionBySpotIdService } from '../../application/service/getObjectCollectionBySpotIdsService';
import { ObjectBrowsingLogRepository } from '../../infrastructure/repository/objectBrowsingLogRepository';
import { ObjectCollectionRepository } from '../../infrastructure/repository/objectCollectionRepository';

export const GetObjectCollectionBySpotIdRouter = express.Router();

type GetObjectCollectionBySpotIdRequest = {
  userId: string;
  spotIds: string[];
};

type ObjectItem = {
  id: string;
  posterId: string;
  spotId: string;
  viewUrl: string;
};

type GetObjectCollectionBySpotIdResponse = {
  objects: ObjectItem[];
};

const getObjectCollectionBySpotIdService =
  new GetObjectCollectionBySpotIdService(
    new ObjectCollectionRepository(),
    new ObjectBrowsingLogRepository(),
  );

GetObjectCollectionBySpotIdRouter.post(
  '/api/object/collection/get',
  async (
    req: Request<{}, {}, GetObjectCollectionBySpotIdRequest>,
    res: Response<GetObjectCollectionBySpotIdResponse | string>,
  ) => {
    const requestBody: GetObjectCollectionBySpotIdRequest = req.body;

    const userId = UserAggregate.userIdFromStr(requestBody.userId);
    const spotIds = ObjectAggregate.spotIdsFromStr(requestBody.spotIds);

    const getObjectCollectionBySpotIdResult =
      await getObjectCollectionBySpotIdService.run(userId, spotIds);
    if (getObjectCollectionBySpotIdResult === undefined) {
      res.status(500).send('Internal Server Error');
      return;
    }

    // レスポンスを送信
    const response: GetObjectCollectionBySpotIdResponse = {
      objects: getObjectCollectionBySpotIdResult
        .getObjectsOfPrivateValue()
        .map((object) => {
          return {
            id: object.getIdOfPrivateValue().getIdOfPrivateValue(),
            posterId: object
              .getUserIdOfPrivateValue()
              .getIdOfPrivateValue()
              .getIdOfPrivateValue(),
            spotId: object.getSpotIdOfPrivateValue().getIdOfPrivateValue(),
            viewUrl: object
              .getSignedUrlOfPrivateValue()
              .getPreSignedUrlOfPrivateValue(),
          };
        }),
    };

    res.json(response);
  },
);
