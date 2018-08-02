import { Request, Response } from 'express';
import { renderApp } from '../handler/app.handler';

export default function(req: Request, res: Response) {
    const body = renderApp();
    res.contentType('html');
    res.send(body);
    res.end();
}
