import 'dotenv/config';

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/routes';

const host = process.env.HOST;
const port = process.env.PORT;
const database = process.env.DATABASE_URL;
const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', router());

router().get('/', function (req, res) {
    res.json({
        status: `API Its Working`,
        route: router().stack.filter(r => r.route)
            .map(r => {
                return {
                    "path": r.route.path,
                    "methods": r.route.methods
                }
            }),
        message: 'Welcome to my crafted with love!',
    });
});

const server = http.createServer(app);
mongoose.Promise = Promise;
mongoose.connect(database);
mongoose.connection.once('connected', () => {
    console.log('Database conected')
})
mongoose.connection.on('error', (error: Error) => {
    console.log({ message: error });
});

server.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`);
});