const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const packageInfo = require('./package.json');

const token = '343838473:AAFssWapy7JMK5ZzShtH4993TuJmgppDGIk';
const telegram = new TelegramBot(token, { polling: true });

telegram.on('message', (message) => {
  console.log(message);
  telegram.sendMessage(message.chat.id, 'Thank fulan u tru frien =)');
});

telegram.onText(/\/pepsu/, (message) => {
	telegram.sendMessage(message.chat.id,'Have sum pepsu Looby excellent for da teeths');
});

const app = express();
app.get('/', (req, res) => res.json({ version: packageInfo.version }));
app.listen(process.env.PORT || 3000, () => console.log('I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do.'));