const puppeteer = require('puppeteer');

(async () => {
  // Configura para rodar headless e sem sandbox (necessário no GitHub Actions)
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Vai para o WhatsApp Web
  await page.goto('https://web.whatsapp.com/', { waitUntil: 'networkidle2' });

  // Espera um seletor do QR code aparecer (indicando que a página carregou)
  await page.waitForSelector('canvas[aria-label="Scan me!"], div[role="presentation"]', { timeout: 15000 }).catch(() => {});

  // Extrai o HTML da página
  const html = await page.content();

  // Imprime o HTML no log (pode ser grande!)
  console.log(html);

  await browser.close();
})();
