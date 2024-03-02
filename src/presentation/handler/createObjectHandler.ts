import express, { Request, Response } from 'express';
import { ObjectAggregate } from '../../domain/model/object/aggregate';
import { UserAggregate } from '../../domain/model/user/aggregate';
import { CreateObjectService } from '../../application/service/createObjectService';
import { ObjectRepository } from '../../infrastructure/repository/objectRepository';

export const createObjectRouter = express.Router();

type CreateObjectRequest = {
  userId: string;
  spotId: string;
  extension: string;
};

type CreateObjectResponse = {
  id: string;
  posterId: string;
  spotId: string;
  extension: string;
  uploadUrl: string;
};

const createObjectService = new CreateObjectService(new ObjectRepository());

createObjectRouter.post(
  '/api/object/create',
  async (
    req: Request<{}, {}, CreateObjectRequest>,
    res: Response<CreateObjectResponse | string>,
  ) => {
    const requestBody: CreateObjectRequest = req.body;

    const userAggregate = new UserAggregate(
      UserAggregate.userIdFromStr(requestBody.userId),
    );
    const spotId = ObjectAggregate.spotIdFromStr(requestBody.spotId);
    const extension = ObjectAggregate.extensionFromStr(requestBody.extension);

    const createObjectResult = await createObjectService.run(
      userAggregate,
      spotId,
      extension,
    );

    if (createObjectResult === undefined) {
      res.status(500).send('Internal Server Error');
      return;
    }

    // レスポンスを送信
    const response: CreateObjectResponse = {
      id: createObjectResult
        .getIdOfPrivateValue()
        .getIdOfPrivateValue()
        .toString(),
      posterId: createObjectResult
        .getUserIdOfPrivateValue()
        .getIdOfPrivateValue()
        .getIdOfPrivateValue(),
      spotId: createObjectResult
        .getSpotIdOfPrivateValue()
        .getIdOfPrivateValue(),
      extension: createObjectResult
        .getExtensionOfPrivateValue()
        .getExtensionOfPrivateValue(),
      uploadUrl: createObjectResult
        .getSignedUrlOfPrivateValue()
        .getPreSignedUrlOfPrivateValue(),
    };

    res.status(201).json(response);
  },
);
