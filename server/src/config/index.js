import _ from 'lodash';
import { dev } from './dev';
import { prod } from './prod';


const env = process.env.NODE_ENV || 'development';


const defaultConfig = {
    PORT: 5000,
    MONGO_URI: process.env.MONGO_URI,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
}


let config = {};

if (env === 'development') {
    config = dev;
} else if (env === 'production' || env === 'prod') {
    config = prod;
}



export default _.merge(defaultConfig, config);