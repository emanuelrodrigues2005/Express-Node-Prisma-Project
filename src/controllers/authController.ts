import {NextFunction, Request, Response, Router} from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const adminRoute = Router();

const adminUser = process.env.ADMIN_USER;
const adminPassword = process.env.ADMIN_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;

if(!adminUser || !adminPassword || !jwtSecret) {
    throw new Error(`Variáveis de ambiente não configuradas`);
}

function errorMiddleware(error: any, res: Response) {
    if(error.statusCode){
        res.status(error.statusCode).json({error: error.message});
    } else {
        console.error('Erro interno no servidor', error);
        res.status(500).json({error: 'Erro interno no servidor'});
    }
}

function validateToken(req: Request, res: Response, next: NextFunction): void {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];

    if(!token) {
        res.status(401).json({
            statusCode: 401,
            message: 'Não autorizado!'
        });
        return;
    }

    try {
        jwt.verify(token, jwtSecret!);
        next();
    } catch (error: any) {
        console.log(error);
        res.status(401).json({
            statusCode: 401,
            message: 'Token inválido'
        });
    }
}

adminRoute.post('/', (req: Request, res: Response) => {
    try {
        const {userName, userPassword} = req.body;

        if(userName !== adminUser) {
            res.status(401).json({ message: 'Usuário inválido' });
            return; 
        }

        if(userPassword !== adminPassword) {
            res.status(401).json({ message: 'Senha inválida' });
            return;
        }

        const token = jwt.sign({ userName }, jwtSecret, {expiresIn: '1h'});

        res.status(200).json({
            statusCode: 200,
            message: 'Login realizado com sucesso',
            data: {
                token
            }
        });
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

export { adminRoute, validateToken };