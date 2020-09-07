const cheerio = require('cheerio');
const base_url = "https://www.senscritique.com/search?q=";
const fetch = require('node-fetch');
const request = require('request');

let movies_list = [];

async function getMovies(movie) {
        movies_list.length = 0
        return fetch(base_url+movie+"&categories[0][0]=Films")
        .then(rep => rep.text())
        .then((body) => {
            const $ = cheerio.load(body);
            const tab = $('.sk-hits > .ProductListItem__Container-sc-1ci68b-0');
            tab.each((i,ele) => {
                const title = $($(ele).find($('.ProductListItem__Title-sc-1ci68b-9'))).text();
                const author = $($(ele).find($('.ProductListItem__OriginalTitleAndDate-sc-1ci68b-10'))).text();
                const genre = $($(ele).find($('.GenreList__List-sc-1m61k3j-0'))).text();
                const note = $($(ele).find($('.bmSMDt'))).text();
                const movie = {title, author, genre, note};
                //console.log(title);
                movies_list.push(movie);
            })
            return movies_list;
        })
}

module.exports = {getMovies};