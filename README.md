# オブジェクトサーバ

> [!CAUTION]
> 正常に実行はできますが、リポジトリはモック化（定数化）された値しか返しません

> [!IMPORTANT]
> 環境変数は[こちらから](https://kjlb.esa.io/posts/5239)確認してください

## 実行方法
### DBコンテナの立ち上げ
```bash
make up
```
### モジュールインストール
```bash
caego build
```

### サーバの実行
```bash
cargo run src/main.rs
```

## その他
### DBコンテナに入りたいとき
```bash
make db
```
