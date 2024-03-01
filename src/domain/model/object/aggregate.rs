use crate::domain::model::user::user_aggregate_id::UserAggregateId;

use super::object_aggregate_id::ObjectAggregateId;
use super::signed_url::SignedUrl;
use super::spot_id::SpotId;

#[derive(Debug, Clone)]
pub struct ObjectAggregate {
  id: ObjectAggregateId,
  spot_id: SpotId,
  user_id: UserAggregateId,
  signed_url: SignedUrl,
}

impl ObjectAggregate {
  pub fn new(spot_id: &SpotId, user_id: &UserAggregateId, signed_url: &SignedUrl) -> Self {
    ObjectAggregate {
      id: ObjectAggregateId::new(),
      spot_id: spot_id.clone(),
      user_id: user_id.clone(),
      signed_url: signed_url.clone(),
    }
  }

  pub fn id(&self) -> &ObjectAggregateId {
    &self.id
  }

  pub fn spot_id(&self) -> &SpotId {
    &self.spot_id
  }

  pub fn user_id(&self) -> &UserAggregateId {
    &self.user_id
  }

  pub fn signed_url(&self) -> &SignedUrl {
    &self.signed_url
  }
}
