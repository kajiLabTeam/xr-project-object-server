import express, { Request, Response } from 'express';

import { UserAggregate } from '../../domain/model/user/aggregate';
import { ObjectAggregate } from '../../domain/model/object/aggregate';
import { GetObjectBySpotIdService } from '../../application/service/getObjectBySpotIdService';
import { ObjectRepository } from '../../infrastructure/repository/objectRepository';
import { ObjectBrowsingLogRepository } from '../../infrastructure/repository/objectBrowsingLogRepository';
import { getCredential } from '../middleware/applicationMiddleware';
import { Application } from '../../utils/globalVariable';

export const GetObjectBySpotIdRouter = express.Router();

type GetObjectBySpotIdRequest = {
  userId: string;
  spotId: string;
};

type GetObjectBySpotIdResponse = {
  id: string;
  posterId: string;
  spotId: string;
  viewUrl: string;
};

const getObjectBySpotIdService = new GetObjectBySpotIdService(
  new ObjectRepository(),
  new ObjectBrowsingLogRepository(),
);

GetObjectBySpotIdRouter.post(
  '/api/object/get',
  async (
    req: Request<{}, {}, GetObjectBySpotIdRequest>,
    res: Response<GetObjectBySpotIdResponse | string>,
  ) => {
    const authorization = req.headers.authorization;
    if (authorization === undefined) {
      res.status(401).send('Unauthorized');
      return;
    }

    const applicationId = getCredential(authorization);
    Application.id = applicationId;

    const requestBody: GetObjectBySpotIdRequest = req.body;

    const getObjectBySpotIdResult = await getObjectBySpotIdService.run(
      UserAggregate.userIdFromStr(requestBody.userId),
      ObjectAggregate.spotIdFromStr(requestBody.spotId),
    );
    if (getObjectBySpotIdResult === undefined) {
      res.status(500).send('Internal Server Error');
      return;
    }

    // レスポンスを送信
    const response: GetObjectBySpotIdResponse = {
      id: getObjectBySpotIdResult.getIdOfPrivateValue().getIdOfPrivateValue(),
      posterId: getObjectBySpotIdResult
        .getUserIdOfPrivateValue()
        .getIdOfPrivateValue()
        .getIdOfPrivateValue(),
      spotId: getObjectBySpotIdResult
        .getSpotIdOfPrivateValue()
        .getIdOfPrivateValue(),
      viewUrl: getObjectBySpotIdResult
        .getSignedUrlOfPrivateValue()
        .getPreSignedUrlOfPrivateValue(),
    };
    res.json(response);
  },
);
