use crate::domain::model::{
  object::object_aggregate_id::ObjectAggregateId,
  object_collection::object_collection_aggregate_id::ObjectCollectionAggregateId,
  user::user_aggregate_id::UserAggregateId,
};

#[derive(Debug, Clone)]
pub struct ObjectBrowsingLog {
  id: ObjectCollectionAggregateId,
  user_id: UserAggregateId,
  object_id: ObjectAggregateId,
}

impl ObjectBrowsingLog {
  pub fn new(user_id: &UserAggregateId, object_id: &ObjectAggregateId) -> Self {
    ObjectBrowsingLog {
      id: ObjectCollectionAggregateId::new(),
      user_id: user_id.clone(),
      object_id: object_id.clone(),
    }
  }

  pub fn id(&self) -> &ObjectCollectionAggregateId {
    &self.id
  }

  pub fn user_id(&self) -> &UserAggregateId {
    &self.user_id
  }

  pub fn object_id(&self) -> &ObjectAggregateId {
    &self.object_id
  }
}
