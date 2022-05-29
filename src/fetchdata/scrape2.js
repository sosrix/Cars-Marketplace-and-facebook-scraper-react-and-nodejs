import pastItems from "./pastItems.json";
const puppeteer = require("puppeteer");
const download = require("image-downloader");
const db = require("./db");
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function scrapeProduct(url) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    await timer(500);
    console.log("timer has been set");
    const ProductID = url;

    const [el0] = await page.$x(
      "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[2]/div/div[2]/div/div[1]/div[1]/div[1]/div[3]/div/div/div/span/a/span"
    );
    const area = await el0.getProperty("textContent");
    const ProductLocation = await area.jsonValue();

    const [el] = await page.$x(
      "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[2]/div/div[1]/div/div[2]/span/div/img"
    );
    const imgSrc = await el.getProperty("src");
    let ProductImg = await imgSrc.jsonValue();

    const [el2] = await page.$x(
      "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[2]/div/div[2]/div/div[1]/div[1]/div[1]/div[1]/span"
    );
    const titleText = await el2.getProperty("textContent");
    const ProductTitle = await titleText.jsonValue();

    const [el3] = await page.$x(
      "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[2]/div/div[2]/div/div[1]/div[1]/div[5]/div[2]/div/div[1]/div"
    );
    const descr = await el3.getProperty("textContent");
    const ProductDescr = await descr.jsonValue();

    const [el4] = await page.$x(
      "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[2]/div/div[2]/div/div[1]/div[1]/div[1]/div[2]/div/span"
    );
    const priceTag = await el4.getProperty("textContent");
    const ProductPrice = await priceTag.jsonValue();
    const options = {
      url: `${ProductImg}`,
      dest: `C:/Users/AHMINA/grabthecar/src/images/${ProductID.slice(42)}.jpg`,
    };
    download
      .image(options)
      .then(({ filename }) => {
        console.log("Saved to", filename);
      })
      .catch((err) => console.error(err));

    db.insertProduct(
      ProductID,
      ProductTitle,
      ProductDescr,
      ProductImg,
      ProductPrice,
      ProductLocation
    );

    console.log({
      ProductID,
      ProductTitle,
      ProductDescr,
      ProductImg,
      ProductPrice,
      ProductLocation,
    });
    browser.close();
  } catch (err) {
    console.log(err);
  } finally {
  }
}

let pastItems = [
  "PUT HERE THE ITEMS IDs YOU WANTO TO ADD TO ADD TO THE DATABASE",
  "you find it at pastItems json file",
];

let counter = 0;

function addProduct() {
  if (counter < pastItems.length) {
    scrapeProduct(
      `https://www.facebook.com/marketplace/item/${pastItems[counter]}`
    );
  } else {
    clearInterval(interval);
  }

  counter++;
}

const interval = setInterval(function () {
  addProduct();
}, 5000);
