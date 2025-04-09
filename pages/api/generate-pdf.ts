// pages/api/generate-pdf.js
import puppeteer from 'puppeteer';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { htmlContent } = req.body;
      const pdfBuffer = await getHtmlToPdf(htmlContent);

      res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Error generating PDF');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}


export async function getHtmlToPdf(htmlContent) {
    const browser =  await puppeteer.launch({
      // args: ['--disable-web-security', '--allow-file-access-from-files'], // Add any additional arguments you need
      // executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files', '--disable-web-security']
    });    
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf();
    await browser.close();
    return pdfBuffer;
  }