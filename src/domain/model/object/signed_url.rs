use url::Url;

use crate::domain::error::object_error::ObjectError;

#[derive(Debug, Clone)]
pub struct SignedUrl {
  view_url: String,
  upload_url: String,
}

impl SignedUrl {
  pub fn new(view_url: &str, upload_url: &str) -> Result<Self, ObjectError> {
    // どちらかが空文字列であるか確認
    if view_url.is_empty() && upload_url.is_empty() {
      return Err(ObjectError::UrlIsEmpty.into());
    }

    // view_urlが空でない場合はURLの形式を確認
    if !view_url.is_empty() {
      if let Err(_) = Url::parse(view_url) {
        return Err(ObjectError::ViewUrlIsNotUrl.into());
      }
    }

    // upload_urlが空でない場合はURLの形式を確認
    if !upload_url.is_empty() {
      if let Err(_) = Url::parse(upload_url) {
        return Err(ObjectError::UploadUrlIsNotUrl.into());
      }
    }
    Ok(SignedUrl {
      view_url: String::from(view_url),
      upload_url: String::from(upload_url),
    })
  }

  pub fn view_url(&self) -> &str {
    if self.view_url.is_empty() {
      return self.upload_url();
    }
    &self.view_url
  }

  pub fn upload_url(&self) -> &str {
    if self.upload_url.is_empty() {
      return self.view_url();
    }

    &self.upload_url
  }
}
