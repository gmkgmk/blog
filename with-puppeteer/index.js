// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-core');

class Skeleton {
  constructor() {
    this.pages = new Set();
    this.browser = null;
  }
  async init() {
    const executablePath = './chromium/Chromium.app/Contents/MacOS/Chromium';
    this.browser = await puppeteer.launch({
      executablePath,
      headless: false
    });
    return this.then();
  }
  then() {
    return Promise.resolve(this);
  }
  async closePage(page) {
    await page.close();
    return this.pages.delete(page);
  }
  async newPage() {
    const debug = true;
    const page = await this.browser.newPage();
    this.pages.add(page);
    // await page.emulate(devices[device]);
    if (debug) {
      page.on('console', (...args) => {
        this.log.info(...args);
      });
    }
    return page;
  }
  async onResponse(page) {
    page.on('response', response => {
      const requestUrl = response.url();
      const ct = response.headers()['content-type'] || '';
      if (response.ok && !response.ok()) {
        throw new Error(`${response.status} on ${requestUrl}`);
      }

      if (ct.indexOf('text/css') > -1 || /\.css$/i.test(requestUrl)) {
        response.text().then(text => {
          console.log('text: ', text);
          // const ast = parse(text, {
          //   parseValue: false,
          //   parseRulePrelude: false
          // });
          // stylesheetAstObjects[requestUrl] = toPlainObject(ast);
          // stylesheetContents[requestUrl] = text;
        });
      }
    });
  }
  async getHtml() {
    const page = await this.newPage();
    this.runPage(page);
  }
  async runPage(page) {
    this.onResponse(page);
  }
}

(async () => {
  const url = "http://localhost:8080/index.html"
  const page = await new Skeleton().init();
  const response = await page.goto(url, { waitUntil: 'networkidle2' })
  const html = await page.getHtml();

})();
