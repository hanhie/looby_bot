const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const _ = require('lodash');

const packageInfo = require('./package.json');
const { fetchMenu } = require('./fetchMenus.js');
const restaurants = require('./restaurants.js');
const pnaRestaurants = restaurants.pnaRestaurants;

const token = '343838473:AAFssWapy7JMK5ZzShtH4993TuJmgppDGIk';
const telegram = new TelegramBot(token, { polling: true });



telegram.on('message', (message) => {
  _.map(pnaRestaurants, (restaurant) => {
  if (message.text == restaurant.command) {
    fetchMenu(restaurant.url, restaurant.orderNum)
    .then((foodsString) => {
    const reply = `${restaurant.messageTitle}:\n${foodsString}`;
    telegram.sendMessage(message.chat.id, reply);
    })
  }
  });
  if(message.text == '/tentti'){
  telegram.sendMessage(message.chat.id, 'Ravintola Tentti:\nKaljaa');
  }
});


telegram.onText(/\/komennot/, (message) => {
  const commands = 'Käytä seuraavia komentoja:\n/juvenes\n/vegebar\n/cafecampus\n/minerva\n/cafepinni\n/linna\n/tentti';
  telegram.sendMessage(message.chat.id, commands);
})

const app = express();
app.get('/', (req, res) => res.json({ version: packageInfo.version }));
app.listen(process.env.PORT || 3000, () => console.log('I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do.'));