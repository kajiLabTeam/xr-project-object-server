use thiserror::Error;

#[derive(Error, Debug, Clone)]
pub enum ObjectError {
  #[error("both urls are empty")]
  UrlIsEmpty,
  #[error("invalid view_url")]
  ViewUrlIsNotUrl,
  #[error("invalid upload_url")]
  UploadUrlIsNotUrl,

}
