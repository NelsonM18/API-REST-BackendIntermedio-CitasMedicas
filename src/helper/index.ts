import crypto from 'crypto';

const SECRET = 'NELSON-API-REST';

export const ramdom = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex')
};