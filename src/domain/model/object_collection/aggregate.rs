use crate::domain::model::object::object_aggregate_id::ObjectAggregateId;

use super::object_collection_aggregate_id::ObjectCollectionAggregateId;

#[derive(Debug, Clone)]
pub struct ObjectAggregate {
  id: ObjectCollectionAggregateId,
  object_ids: Vec<ObjectAggregateId>,
}

impl ObjectAggregate {
  pub fn new(object_ids: &Vec<ObjectAggregateId>) -> Self {
    ObjectAggregate {
      id: ObjectCollectionAggregateId::new(),
      object_ids: object_ids.clone(),
    }
  }

  pub fn id(&self) -> &ObjectCollectionAggregateId {
    &self.id
  }

  pub fn object_ids(&self) -> &Vec<ObjectAggregateId> {
    &self.object_ids
  }

  pub fn add_object_id(&mut self, object_id: &ObjectAggregateId) {
    self.object_ids.push(object_id.clone());
  }
}
