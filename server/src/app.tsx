import * as express from 'express';
import * as path from "path";
import * as bodyParser from 'body-parser';

import Home from '../../client/src/index';

class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(express.static(path.join(__dirname, '/../../client')));
    this.express.use('/scripts', express.static(path.join(__dirname + '/../../node_modules/')));

    this.express.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.stack);
      res.status(500).send({
        success: false,
        message: err.stack
      });
    });
  }

  private routes(): void {
    let router = express.Router();

    router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.sendFile('index.html');
    });

    this.express.use('/', router);

    this.express.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(404).send({
        success: false,
        message: 'Not found'
      });
      return next();
    });
  }
}

export default new App().express;