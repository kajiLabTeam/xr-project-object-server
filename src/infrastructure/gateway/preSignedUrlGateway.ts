import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { UPLOAD_URL_LIFETIME, VIEW_URL_LIFETIME } from '../../config/const';
import {
  UploadPresignedUrlRecord,
  ViewPreSignedUrlRecord,
} from '../record/preSignedUrlRecord';
import { InfrastructureError } from '../error/infrastructureError';

export class PreSignedUrlGateway {
  async publishUploadPresignedUrl(
    s3: S3Client,
    bucket: string,
    key: string,
  ): Promise<UploadPresignedUrlRecord> {
    try {
      const url = await getSignedUrl(
        s3,
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
        }) as any,
        { expiresIn: UPLOAD_URL_LIFETIME },
      );

      return new UploadPresignedUrlRecord(url);
    } catch (e) {
      throw new InfrastructureError(
        'FailedToPublishUploadPresignedUrl',
        'Failed to publish upload presigned url',
      );
    }
  }

  async publishViewPresignedUrl(
    s3: S3Client,
    bucket: string,
    key: string,
  ): Promise<ViewPreSignedUrlRecord> {
    try {
      const url = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: bucket,
          Key: key,
        }) as any,
        { expiresIn: VIEW_URL_LIFETIME },
      );

      return new ViewPreSignedUrlRecord(url);
    } catch (e) {
      throw new InfrastructureError(
        'FailedToPublishViewPresignedUrl',
        'Failed to publish view presigned url',
      );
    }
  }
}
