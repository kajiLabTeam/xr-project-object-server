use anyhow::anyhow;

use std::str::FromStr;
use ulid::Ulid;

#[derive(Debug, Clone, Eq, Hash, PartialOrd, PartialEq)]
pub struct ObjectAggregateId {
  id: Ulid,
}

impl ObjectAggregateId {
  pub fn new() -> Self {
    ObjectAggregateId { id: Ulid::new() }
  }
}

impl FromStr for ObjectAggregateId {
  type Err = anyhow::Error;

  fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
    match Ulid::from_str(s) {
      Ok(id) => Ok(ObjectAggregateId { id }),
      Err(err) => Err(anyhow!(err)),
    }
  }
}
