const fs = require('fs');
const util = require('util');
const xml2js = require('xml2js');
const puppeteer = require('puppeteer');

// Read your XML file
const xmlData = fs.readFileSync('./controllers/test_xml.xml', 'utf-8');

// Parse XML to JavaScript object
const parser = new xml2js.Parser();
const parseString = util.promisify(parser.parseString);

async function convertXmlToHtml(xmlData) {
  const jsonData = await parseString(xmlData);
  
  // Now you can create an HTML string from jsonData, using a templating engine if needed
  // For simplicity, let's assume jsonData is a plain object
  const title = jsonData['cfdi:Comprobante'].$.Folio; // Accessing the 'Folio' attribute

  const html = `<html><body><h1>${title}</h1></body></html>`;
  return html;
}

async function generatePdf(html) {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: 'C:/Users/dsczk/AppData/Local/Google/Chrome/Application/chrome.exe' // Replace with the actual path to Chrome
      });

  const page = await browser.newPage();

  // Set content to the HTML
  await page.setContent(html);

  // Generate PDF
  await page.pdf({ path: 'output.pdf', format: 'A4' });

  await browser.close();
}

(async () => {
  try {
    const html = await convertXmlToHtml(xmlData);
    await generatePdf(html);
    console.log('PDF Generated successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
})();
