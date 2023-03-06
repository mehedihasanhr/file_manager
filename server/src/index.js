import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import { credentials } from './middlewares/credential.middleware';
import routes from './routes';
import { corsOptions } from './utils/corsOptions';


/* express instance */
const app = express();

/* dotenv config */
dotenv.config();
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes */
app.use('/api', routes);

mongoose.set('strictQuery', false);


/* mongoose connection */
(async () => {
    try {
        await mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log('MongoDB connected...'))
    } catch (error) {
        console.log(error)
    }
})()


/* server port */
const port = config.PORT;

/* server listen */
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
