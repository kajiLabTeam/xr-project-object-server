import { Pool } from 'pg';

import { ObjectBrowsingLogGateway } from '../gateway/objectBrowsingLogGateway';
import { ObjectBrowsingLogAggregate } from '../../domain/model/objectBrowsingLog/aggregate';
import { ObjectBrowsingLogRepositoryImpl } from '../../domain/repository_impl/objectBrowsingLogIdRepositoryImpl';

const objectBrowsingLogGateway = new ObjectBrowsingLogGateway();

export class ObjectBrowsingLogRepository
  implements ObjectBrowsingLogRepositoryImpl
{
  async save(
    conn: Pool,
    objectBrowsingLog: ObjectBrowsingLogAggregate,
  ): Promise<void> {
    const objectBrowsingLogId = objectBrowsingLog
      .getIdOfPrivateValue()
      .getIdOfPrivateValue()
      .toString();
    const userId = objectBrowsingLog
      .getUserIdOfPrivateValue()
      .getIdOfPrivateValue()
      .toString();
    const objectId = objectBrowsingLog
      .getObjectIdOfPrivateValue()
      .getIdOfPrivateValue()
      .toString();

    objectBrowsingLogGateway.insert(
      conn,
      objectBrowsingLogId,
      userId,
      objectId,
    );
  }
}
