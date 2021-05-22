# SlackLogStore

Google App Scriptsをベースにスプレッドシートに指定したチャンネルのログを記録しま
す。

## 用意するもの
- チャンネル名、及びそのチャンネルのID
- スプレッドシート及びそのURL 
-- 最初の行から
- Slack APIのOAuthトークン
-- トークンについて：
-- トークンの種類：User
-- トークンスコープ：channels:history, groups:history

## 仕様
- チャンネル名、投稿内容、日時などを30分単位で記載していきます
