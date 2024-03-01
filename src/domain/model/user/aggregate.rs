use super::user_aggregate_id::UserAggregateId;

#[derive(Debug, Clone, Eq, Hash, PartialOrd, PartialEq)]
pub struct UserAggregate {
  id: UserAggregateId,
}

impl UserAggregate {
  pub fn new(user_id: &UserAggregateId) -> Self {
    UserAggregate { id: user_id.clone() }
  }
}
