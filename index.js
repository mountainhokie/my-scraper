const puppeteer = require("puppeteer-extra");
const cheerio = require("cheerio");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

puppeteer.launch({ headless: true }).then(async (browser) => {
  console.log("Running tests..");

  let title_selector,
    company_selector,
    description_selector,
    contactName_selector,
    applicants_selector;

  const url =
    "https://www.indeed.com/viewjob?jk=a53549e17f67d1f1&tk=1h6c132a52ahi002&from=hp&vjs=3&advn=6821675637299254&adid=407578074&ad=-6NYlbfkN0BrkGAw7VGTTnqsFJf6dWxF89xA6YoUaNLrpGgF8xRh1wkCvszqyrxOZWRmJAhtdlKuSPMhoFZFonA2CUi5HHIP2aKQHvhVIoMaX1fSoqgVH3Za678dvsJh7ecfPeuPefUr1x0UWjfFGD0eAA_-4YBZg-CpXqjZt8Cf0YjlQDKBjazc2nbvRrT1WUvgwPam6dfk2Mp0hbr89U7ahCpFd2dZXMe-M8dibh8Fv546g1uFXfiDACgCtnsi0SGX8uczhuA4CGJcetq-lvN8rATmjhALSNqgLq1G4899Q0Fm3JKM4bUc_NjMk4GUJAVXjwRyAC0Bnq3qvGJ-NB3TJJ8El97k8enuOFKaNRDtjRF-TZcuHlawO46sQNckcf8qOw91gXNr_WS9UFFHMsGjm1u3KqfmN1sMdf5jL3jtSWFB0692AaCsYMTIW_psPXR6UOZr48BCzmdcOEM-bouLKz9kzHN1ZUpf-eM0iRu_JvyZaH0u-A==&xkcb=SoCG-_M3MMKGYbRTlx0LbzkdCdPP&sjdu=Q7wooHtv3H4LkYkPMBrmVAadkJqiop20-jBi70t77ShoXL8I8FlAb9_Jj50P4XH4GifcOB-HTlowenk0-ysldRUKNNutwg2_HHHC07uXikFqGrYMssx9CWNG_hIJQSrrrMa0r1fvrc93gc6BK3QJuA";

  title_selector = "h1 span";
  company_selector = 'div[data-testid="inlineHeader-companyName"]';
  description_selector = "#jobDescriptionText";

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.waitForSelector(".host-hydrated");

  const content = await page.content();
  const $ = cheerio.load(content);
  const titleExtracted = $(title_selector).text();
  const companyExtracted = $(company_selector).text();
  const descriptionExtracted = $(description_selector).html();
  console.log(titleExtracted);
  console.log(companyExtracted);
  console.log(descriptionExtracted);

  await browser.close();
  console.log(`All done.✨`);
});
