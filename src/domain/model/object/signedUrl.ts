import * as url from "url";

export class SignedUrl {
  private _viewUrl: string | undefined;
  private _uploadUrl: string | undefined;

  constructor(_uploadUrl: string = "", _viewUrl: string = "") {
    if (_uploadUrl === "" && _viewUrl === "") {
      throw new Error("URL is empty");
    }

    if (!this.isValidUrl(_uploadUrl) && !this.isValidUrl(_viewUrl)) {
      throw new Error("Invalid URL format");
    }

    this._viewUrl = _viewUrl;
    this._uploadUrl = _uploadUrl;
  }

  get uploadUrl() {
    return this._uploadUrl;
  }

  get viewUrl() {
    return this._viewUrl;
  }

  private isValidUrl(testUrl: string): boolean {
    try {
      const parsedUrl = new url.URL(testUrl);
      return true;
    } catch (error) {
      return false;
    }
  }
}
