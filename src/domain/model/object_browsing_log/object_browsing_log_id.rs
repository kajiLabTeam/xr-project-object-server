use anyhow::anyhow;

use std::str::FromStr;
use ulid::Ulid;

#[derive(Debug, Clone, Eq, Hash, PartialOrd, PartialEq)]
pub struct ObjectBrowsingLogId {
  id: Ulid,
}

impl ObjectBrowsingLogId {
  pub fn new() -> Self {
    ObjectBrowsingLogId { id: Ulid::new() }
  }
}

impl FromStr for ObjectBrowsingLogId {
  type Err = anyhow::Error;

  fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
    match Ulid::from_str(s) {
      Ok(id) => Ok(ObjectBrowsingLogId { id }),
      Err(err) => Err(anyhow!(err)),
    }
  }
}
