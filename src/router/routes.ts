import express from 'express';
import authentication from './authentication';
import user from './user';
import doctor from './doctor';
import pacient from './pacient';
import medical from './medical';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    user(router);
    doctor(router);
    pacient(router);
    medical(router);

    return router;
};