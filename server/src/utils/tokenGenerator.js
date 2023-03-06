import jwt from 'jsonwebtoken';
import config from '../config';

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN } = config;


export const token = {
    // access token
    accessToken: (payload) => {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN, { expiresIn: '5m' }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            })
        })
    },

    // verify access token
    verifyAccessToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET_ACCESS_TOKEN, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            })
        })
    },

    // refresh token
    refreshToken: (payload) => {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, JWT_SECRET_REFRESH_TOKEN, { expiresIn: '7d' }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            })
        })
    },

    // verify access token
    verifyRefreshToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            })
        })
    },
}

