const puppeteer = require('puppeteer');
const path = require('path');

async function generateResumePDF() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.join(__dirname, '../public/resume.html');
  const pdfPath = path.join(__dirname, '../public/resume.pdf');
  
  console.log('Loading HTML file...');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  console.log('Generating PDF...');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });
  
  console.log('PDF generated successfully at:', pdfPath);
  await browser.close();
}

generateResumePDF().catch(console.error);
