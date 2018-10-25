import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import { join } from 'path';

// Express Engine
import * as express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require('./dist/server/main');

const app = express();
const PORT = process.env.PORT || 4000;
const BROWSER_FOLDER = join(process.cwd(), 'dist', 'browser');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
// Define new rendering engine. We call it 'html'.
app.engine(
  'html',
  ngExpressEngine({
    // Here we specify AppServerModuleNgFactory
    bootstrap: AppServerModuleNgFactory,
    // Configure Angular Universal specific providers for server, not for client
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
      // In case you want to use an AppShell with SSR and Lazy loading
      // you'd need to uncomment the below. (see: https://github.com/angular/angular-cli/issues/9202)
      // {
      //   provide: NgModuleFactoryLoader,
      //   useClass: ModuleMapNgFactoryLoader,
      //   deps: [
      //     Compiler,
      //     MODULE_MAP
      //   ],
      // },
    ]
  })
);

// Any view which is rendered by express should be rendered by 'html' engine.
app.set('view engine', 'html');

// Configure the place of view files
app.set('views', BROWSER_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Server static files from /dist/browser
app.get(
  '*.*', // *.js and *.css files
  express.static(BROWSER_FOLDER, {
    maxAge: '1y' // cache these files up to 1 year
  })
);

// All regular routes use the Universal Express Engine
// /, /home, /users, ...
app.get('*', (req, res) => {
  res.render('index', { req }); // index - is the view that we want to render
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
