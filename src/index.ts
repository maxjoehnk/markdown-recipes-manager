import { join } from 'path';
import * as express from 'express';
import { load } from 'dotenv';
import appController from './controller/app.controller';
import apiController from './controller/api.controller';
import syncService from './services/sync.service';

load();

const port = process.env.HTTP_PORT || 8080;

syncService();

const app = express();

app.use(express.static(join(__dirname, '../dist')));
app.use('/api', apiController);
app.use('/*', appController);

app.listen(port, () => console.log(`Listening on ${port}`));
