const puppeteer = require("puppeteer");
let fs = require("fs");
let arrayOfItems;

let searchTerms = [
  "nyc",
  "la",
  "vegas",
  "chicago",
  "houston",
  "miami",
  "sanantonio",
  "orlando",
  "sandiego",
  "arlington",
  "atlanta",
  "austin",
  "baltimore",
  "boston",
  "charlotte",
  "cincinnati",
  "columbus",
  "dallas",
  "denver",
  "detroit",
  "elpaso",
  "fortworth",
  "honolulu",
  "indianapolis",
  "jacksonville",
  "kansascity",
  "louisville",
  "memphis",
  "milwaukee",
  "minneapolis",
  "nashville",
  "neworleans",
  "oklahoma",
  "philly",
  "phoenix",
  "pittsburgh",
  "portland",
  "sac",
  "sanfrancisco",
  "sanjose",
  "seattle",
  "tampa",
  "tucson",
  "dc",
];

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function getItems() {
  fs.readFile("./src/fetchdata/pastItems.json", "utf-8", function (err, data) {
    arrayOfItems = JSON.parse(data);
  });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (var i = 0; i < searchTerms.length; i++) {
    var newItems = [];
    var searchTerm = searchTerms[i].replace(/ /g, "%20");
    console.log(`\nResults for ${searchTerms[i]}:\n`);
    await page.goto(
      `https://www.facebook.com/marketplace/${searchTerm}/search/?daysSinceListed=1&sortBy=best_match&query=vehicles&exact=false`
    );
    await timer(10000);
    console.log("timer has been set");
    let bodyHTML = await page.evaluate(() => document.body.outerHTML);
    let searchResult = JSON.parse(
      bodyHTML.split(/(?:"marketplace_search":|,"marketplace_seo_page")+/)[2]
    );
    let items = searchResult["feed_units"]["edges"];
    if (items.length > 1) {
      items.forEach((val, index) => {
        var ID = val["node"]["listing"]["id"];
        var link = `https://www.facebook.com/marketplace/item/${val["node"]["listing"]["id"]}`;
        var title = val["node"]["listing"]["marketplace_listing_title"];
        var price = val["node"]["listing"]["listing_price"]["formatted_amount"];
        var image = val["node"]["listing"]["primary_listing_photo"];
        var item = {
          id: ID,
          title: title,
          price: price,
          link: link,
          image: image,
        };
        if (arrayOfItems.pastItems.includes(ID)) {
        } else {
          arrayOfItems.pastItems.push(ID);
          newItems.push(item);
          console.log(item);
        }
      });
    }
    if (newItems.length > 0) {
      console.log("New items");
    } else {
      console.log("No new items for " + searchTerms[i]);
    }
  }
  await browser.close();
  fs.writeFile(
    "./src/fetchdata/pastItems.json",
    JSON.stringify(arrayOfItems),
    "utf-8",
    function (err) {
      if (err) throw err;
      console.log("Updated past items");
    }
  );
}

getItems();
