use anyhow::anyhow;

use std::str::FromStr;
use ulid::Ulid;

#[derive(Debug, Clone, Eq, Hash, PartialOrd, PartialEq)]
pub struct UserAggregateId {
  id: Ulid,
}

impl UserAggregateId {
  pub fn new() -> Self {
    UserAggregateId { id: Ulid::new() }
  }
}

impl FromStr for UserAggregateId {
  type Err = anyhow::Error;

  fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
    match Ulid::from_str(s) {
      Ok(id) => Ok(UserAggregateId { id }),
      Err(err) => Err(anyhow!(err)),
    }
  }
}
