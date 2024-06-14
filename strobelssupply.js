import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { promises as fs } from 'fs';

puppeteer.use(StealthPlugin());

(async function start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        const data = await fs.readFile('options.json', 'utf-8');
        const links = JSON.parse(data);

        for (let link of links) {
            await page.goto(link);
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1500)));

            const hed = await page.evaluate(() => {
                const element = document.querySelector('#main-content > div.page-product-custom > div.halo-productView-top > div > div.productView.halo-productView.halo-productView-custom > div.halo-productView-right > div.productView-wrapper-details > section.productView-details.product-data > div > div.productView-title-wrapper > h1');
                return element ? element.innerText : null;
            });

            const hed2 = await page.evaluate(() => {
                const element = document.querySelector('#main-content > div.page-product-custom > div.halo-productView-top > div > div.productView.halo-productView.halo-productView-custom > div.halo-productView-right > div.productView-wrapper-details > section.productView-details.product-data > div > div.productView-price > div > div > div > span.price.price--withoutTax.label-not-sale');
                return element ? element.innerText : null;
            });
            
            const hed3 = await page.evaluate(() => {
                const element = document.querySelector('#main-content > div.page-product-custom > div.halo-productView-top > div > div.productView.halo-productView.halo-productView-custom > div.halo-productView-right > div.productView-wrapper-details > section.productView-details.product-data > div > div.productView-price > div > div > div > span.uom');
                return element ? element.innerText : null;
            });
            
            
            const hed4 = await page.evaluate(() => {
                const element = document.querySelector('#main-content > div.page-product-custom > div.halo-productView-top > div > div.productView.halo-productView.halo-productView-custom > div.halo-productView-right > div.productView-wrapper-details > section.productView-details.product-data > div > div.productView-info > div:nth-child(2) > span.productView-info-value');
                return element ? element.innerText : null;
            });
            

            const hed5 = await page.evaluate(() => {
                const element = document.querySelector('#main-content > div.page-product-custom > div.halo-productView-top > div > div.productView.halo-productView.halo-productView-custom > div.halo-productView-right > div.productView-wrapper-details > section.productView-details.product-data > div > div.productView-info > div:nth-child(3) > span.productView-info-value');
                return element ? element.innerText : null;
            });
            
            const hed6 = await page.evaluate(() => {
                const element = document.querySelector('#main-content > div.page-product-custom > div.halo-productView-top > div > div.breadcrumbs-product > nav > ol');
                return element ? element.innerText : null;
            });
            
            const hed7 = await page.evaluate(() => {
                const element = document.querySelector('#currencySelection li.dropdown-menu-item a');
                return element ? element.href : null;
            });
            


            if ( hed && hed2 && hed3 && hed4 && hed5 && hed6 && hed7 ) {
                // Save data to file (optional)
                await fs.appendFile('results.json', JSON.stringify({ hed, hed2, hed3, hed4, hed5, hed6, hed7 }) + '\n');
            }

        }
    } catch (error) {
        console.error('Error reading or processing links from options.json:', error);
    }

    await browser.close();
})();






























// Get link from page and save in JSON 

// puppeteer.use(StealthPlugin());

// (async function start () {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     await page.goto('https://www.strobelssupply.com/brands/united-abrasives/?_bc_fsnf=1&in_stock=2');
//     await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 4000)));


//     async function clikss () {
//         try {
//             await page.waitForSelector('#listing-showmoreBtn > a > span', { timeout: 4000 });
//             const pageDown = await page.$('#listing-showmoreBtn > a > span');
//             await pageDown.click();
//         } catch (error) {
//             console.error('Show More button not found or could not be clicked', error);
//             }
//         }

//     for (let i = 0; i <= 259; i++) {
//         await clikss();
//         // Optionally, add a delay between clicks to avoid being detected as a bot
//         await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 4000)));
//     }
    
//     const hrefs = await page.evaluate(() => {
//         const elements = document.querySelectorAll('#product-listing-container form ul li article div h3 a');
//         return Array.from(elements).map(anchor => anchor.href);
//     });

//     console.log(hrefs);

//     if (hrefs.length > 0) {
//         await fs.writeFile('strobelssupplyLincItam.json', JSON.stringify(hrefs, null, 2));
//     }


// })();