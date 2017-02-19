const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = () => {
  return axios.get('http://pna.fi/tay/')
    .then((response)=> {
      return response.data;
    })
}

exports.fetchMenu = (url, orderNum) => {
  return getHtml().then((html) => {
    const $ = cheerio.load(html);
    const linkElem = typeof orderNum !== 'number' ? $(`a[href="${url}"]`) : $($(`a[href="${url}"]`)[orderNum]);
    return linkElem.parent().next().children()
      .map((i, elem) => $(elem).text())
      .get()
      .join("\n");
  });
}