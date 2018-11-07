const puppeteer = require('puppeteer');
let pageStart = 0;
let names = [];

async function scrapePage(pageStart) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://games.espn.com/ffl/tools/projections?leagueId=957777&startIndex=' + pageStart);
    //await page.screenshot({ path: 'example.png' });
    const continueLoop = await page.evaluate(() => {
        if (document.querySelectorAll(".pncPlayerRow ").length) {
            return true;
        } else {
            return false;
        }
    })
    const name = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".pncPlayerRow ")).map((el) => {
            return {
                name: el.children[0].children[0].innerText,
                projection: el.children[15].innerText
            }
        })
    })
    names.push(...name)
    await browser.close();
}
scrapePage(pageStart).then(() => {
    scrapePage(pageStart+40)
    console.log(names)
});
