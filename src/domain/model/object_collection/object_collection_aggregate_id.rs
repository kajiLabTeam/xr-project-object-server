use anyhow::anyhow;

use std::str::FromStr;
use ulid::Ulid;

#[derive(Debug, Clone)]
pub struct ObjectCollectionAggregateId {
  id: Ulid,
}

impl ObjectCollectionAggregateId {
  pub fn new() -> Self {
    ObjectCollectionAggregateId { id: Ulid::new() }
  }

  pub fn id(&self) -> &Ulid {
    &self.id
  }
}

impl FromStr for ObjectCollectionAggregateId {
  type Err = anyhow::Error;

  fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
    match Ulid::from_str(s) {
      Ok(id) => Ok(ObjectCollectionAggregateId { id }),
      Err(err) => Err(anyhow!(err)),
    }
  }
}
