const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const packageInfo = require('./package.json');
const axios = require('axios');
const cheerio = require('cheerio');

const token = '343838473:AAFssWapy7JMK5ZzShtH4993TuJmgppDGIk';
const telegram = new TelegramBot(token, { polling: true });

telegram.onText(/\/juvenes/, (message) => {
	const url = 'http://www.juvenes.fi/fi-fi/ravintolatjakahvilat/opiskelijaravintolat/tayp%C3%A4%C3%A4kampus/yliopistonravintola.aspx';
	getMenu(url, 0)
		.then((foodStrings) => {
			telegram.sendMessage(message.chat.id,'Yliopiston ravintolan (Juvenes) lista: \n' + foodStrings);
		});
});


telegram.onText(/\/vegebar/, (message) => {
	const url = 'http://www.juvenes.fi/fi-fi/ravintolatjakahvilat/opiskelijaravintolat/tayp%C3%A4%C3%A4kampus/yliopistonravintola.aspx';
	getMenu(url, 1)
		.then((foodStrings) => {
			telegram.sendMessage(message.chat.id,'Yliopiston ravintolan (Vegebar) lista: \n' + foodStrings);
		});
});

telegram.onText(/\/cafecampus/, (message) => {
	const url = 'http://www.juvenes.fi/fi-fi/ravintolatjakahvilat/opiskelijaravintolat/tayp%C3%A4%C3%A4kampus/caf%C3%A9campus.aspx';
	getMenu(url, null)
		.then((foodStrings) => {
			telegram.sendMessage(message.chat.id, 'Café Campuksen lista: \n' + foodStrings);
		});
});

telegram.onText(/\/minerva/, (message) => {
	const url = 'http://www.amica.fi/minerva';
	getMenu(url, null)
		.then((foodStrings) => {
			telegram.sendMessage(message.chat.id, 'Minervan lista: \n' + foodStrings);
		});
});

telegram.onText(/\/cafepinni/, (message) => {
	const url = 'http://www.juvenes.fi/fi-fi/ravintolatjakahvilat/opiskelijaravintolat/tayp%C3%A4%C3%A4kampus/caf%C3%A9lunchpinni.aspx';
	getMenu(url, null)
		.then((foodStrings) => {
			telegram.sendMessage(message.chat.id, 'Café Pinnin lista: \n' + foodStrings);
		});
});

telegram.onText(/\/linna/, (message) => {
	const url = 'http://www.sodexo.fi/linna';
	getMenu(url, null)
		.then((foodStrings) => {
			telegram.sendMessage(message.chat.id, 'Sodexo Linnan lista: \n' + foodStrings);
		});
});

telegram.onText(/\/komennot/, (message) => {
	const commands = 'Käytä seuraavia komentoja:\n/juvenes\n/vegebar\n/cafecampus\n/minerva\n/cafepinni\n/linna';
	telegram.sendMessage(message.chat.id, commands);
})

const getHtml = () => {
	return axios.get('http://pna.fi/tay/')
		.then((response)=> {
			return response.data;
		}) 
}

const getMenu = (url, orderNum) => {
	return getHtml().then((html) => {
		const $ = cheerio.load(html);
		const linkElem = typeof orderNum !== 'number' ? $(`a[href="${url}"]`) : $($(`a[href="${url}"]`)[orderNum]);
		return linkElem.parent().next().children()
			.map((i, elem) => $(elem).text())
			.get()
			.join("\n");
	});
}

const app = express();
app.get('/', (req, res) => res.json({ version: packageInfo.version }));
app.listen(process.env.PORT || 3000, () => console.log('I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do.'));