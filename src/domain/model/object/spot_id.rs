use anyhow::anyhow;

use std::str::FromStr;
use ulid::Ulid;

#[derive(Debug, Clone, Eq, Hash, PartialOrd, PartialEq)]
pub struct SpotId {
  id: Ulid,
}

impl SpotId {
  pub fn new() -> Self {
    SpotId { id: Ulid::new() }
  }
}

impl FromStr for SpotId {
  type Err = anyhow::Error;

  fn from_str(s: &str) -> std::result::Result<Self, Self::Err> {
    match Ulid::from_str(s) {
      Ok(id) => Ok(SpotId { id }),
      Err(err) => Err(anyhow!(err)),
    }
  }
}
