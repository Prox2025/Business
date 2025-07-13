const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // rodar sem interface gráfica
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Define viewport como desktop (largura e altura típicas)
  await page.setViewport({ width: 1366, height: 768 });

  // Define user-agent típico de um navegador desktop Chrome no Windows
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
                    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/115.0.0.0 Safari/537.36';
  await page.setUserAgent(userAgent);

  // Navega para o WhatsApp Web
  await page.goto('https://web.whatsapp.com/', { waitUntil: 'networkidle2' });

  // Aguarda o seletor do QR code aparecer (indica que carregou)
  await page.waitForSelector('canvas[aria-label="Scan me!"], div[role="presentation"]', { timeout: 15000 }).catch(() => {});

  // Extrai o HTML da página
  const html = await page.content();

  // Imprime o HTML no log
  console.log(html);

  await browser.close();
})();
