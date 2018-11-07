const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');

const writeStream = fs.createWriteStream('projections(week 10).csv');

writeStream.write(`Projection \n`);

request('http://games.espn.com/ffl/tools/projections?leagueId=957777&startIndex=0', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const playerData = [];
        $('.pncPlayerRow').each((i, el) => {
            const Projection = $(el)
               //console.log(Projection.children().eq(0).children().eq(0).text()); 
               console.log(el.children[0].children[0])
            
                // .find('.appliedPoints')
                // .text();

                // writeStream.write(`${Projection} \n`);
        });

        console.log('Scraping Done...');
        //console.log(playerData);
    }
});