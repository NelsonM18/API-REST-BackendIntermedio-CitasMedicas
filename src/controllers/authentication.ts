import express from 'express';
import { createUser, getUserByEmail } from '../db/user';
import { authentication, ramdom } from '../helper/index';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        // Validar Campos Vacios
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        // Validar si Usuario Existe
        const userExist = await getUserByEmail(email);

        if (userExist) {
            return res.sendStatus(400);
        }

        // Se utiliza el metodo Crear Usuario
        const salt = ramdom();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        // Validar Campos Vacios
        if (!email || !password ) {
            return res.sendStatus(400);
        }

        // Validar si Usuario Existe
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        // Comprobar el hash del usuario como metodo login
        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password != expectedHash){
            return res.sendStatus(403);
        }

        // Si se loguea se actualiza el session token del usuario
        const salt = ramdom();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        // Estabelecer cookie
        res.cookie('NELSON-AUTH', user.authentication.sessionToken, {domain: '127.0.0.1', path: '/api'})

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);

        return res.sendStatus(400);
    }
}