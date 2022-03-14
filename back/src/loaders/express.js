import bodyParser from 'body-parser';
import cors from 'cors';

import router from '../api/index.js';

export default async ({ app }) => {
    app.use(bodyParser.urlencoded({extended: true})); // 중첩된 객체 파싱 가능
    app.use(bodyParser.json());
    app.use(cors({
        origin: "*",
        credentials: true
    }));

    app.use('/', router);

    return app;
}