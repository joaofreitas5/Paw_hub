import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express, { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { readFileSync } from 'fs';
import bootstrap from './main.server';

const app = express();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(browserDistFolder, 'index.html');

// Serve static files from /browser
app.get(
  '*.*',
  express.static(browserDistFolder, {
    maxAge: '1y',
  }),
);

// All regular routes use the Universal engine
app.get('*', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { protocol, originalUrl, baseUrl, headers } = req;

    const documentHtml = await renderApplication(bootstrap, {
      document: await readFileSync(indexHtml, 'utf-8'),
      url: `${protocol}://${headers.host}${originalUrl}`,
      platformProviders: [
        {
          provide: APP_BASE_HREF,
          useValue: baseUrl,
        },
      ],
    });

    res.send(documentHtml);
  } catch (err: unknown) {
    next(err);
  }
});

function run(): void {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Development vs production
const mainModule = require.main;
const moduleFilename = mainModule?.filename || '';

if (moduleFilename === fileURLToPath(import.meta.url)) {
  run();
}

export default app;
