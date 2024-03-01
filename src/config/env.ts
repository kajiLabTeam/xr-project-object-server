class PostgresEnv {
  private _host: string | undefined;
  private _port: string | undefined;
  private _database: string | undefined;
  private _user: string | undefined;
  private _password: string | undefined;

  constructor() {
    this._host = process.env.POSTGRES_HOST;
    this._port = process.env.POSTGRES_PORT;
    this._database = process.env.POSTGRES_DB;
    this._user = process.env.POSTGRES_USER;
    this._password = process.env.POSTGRES_PASSWORD;
  }

  get host() {
    return this._host;
  }

  get port() {
    return this._port;
  }

  get database() {
    return this._database;
  }

  get user() {
    return this._user;
  }

  get password() {
    return this._password;
  }
}

class MinioEnv {
  private _serviceName: string = "s3";
  private _endpoint: string | undefined;
  private _accessKey: string | undefined;
  private _secretKey: string | undefined;

  constructor() {
    this._endpoint = process.env.MINIO_HOST;
    this._accessKey = process.env.MINIO_ACCESS_KEY;
    this._secretKey = process.env.MINIO_SECRET_KEY;
  }

  get serviceName() {
    return this._serviceName;
  }

  get endpoint() {
    return this._endpoint;
  }

  get accessKey() {
    return this._accessKey;
  }

  get secretKey() {
    return this._secretKey;
  }
}
