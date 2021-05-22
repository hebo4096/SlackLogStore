//Slack APIのトークン
var OAUTH_TOKEN = '{your User OAUTH_TOKEN}';

//ログ取得対象のチャンネル
let channels = {
  "channel_name": "C1234567890(Channel_ID)",
};

//現在時刻とSlackのログを取得した時刻の差分を求めるための変数たち
var date = new Date();
var now = date.getTime()/1000;
var cmpWithCommentTime;
var timeUnit = 30;

//HTTPヘッダ OAuth認可用
var options = {
  "method": "GET",
  "headers": { "Authorization": "Bearer "+ OAUTH_TOKEN },
};

//アプリがログを取得する数
var limitOfLogsPerAction = 1000;

//スプレッドシート
var SHEET_URL = "{YourSpreadsheetUrl}";
spreadSheet = SpreadsheetApp.openByUrl(SHEET_URL);
var sheet = spreadSheet.getActiveSheet();

function SlackLogStore() {
  console.log(now);
  var fetchUrlBase = 'https://slack.com/api/conversations.history?channel=';
  Object.keys(channels).forEach((channel)=>{
    var fetchUrl = fetchUrlBase + channels[channel] + '&limit='+limitOfLogsPerAction;
    console.log(fetchUrl);
    var res = UrlFetchApp.fetch(fetchUrl, options);
    var resParse = JSON.parse(res);
    resParse.messages.reverse().forEach((message)=>{
      cmpWithCommentTime = now - message.ts;
      if(message.subtype == null && cmpWithCommentTime < 60*timeUnit){
        sheet.appendRow([channel,　message.text, (new Date(message.ts*1000))]);
      }
    });
  });
}

