import { Router, Response, Request } from 'express';
import { FindManyClasses } from '../services/class/findManyClasses';
import { FindClassById } from '../services/class/findClassById';
import { CreateClass } from '../services/class/createClass';
import { ClassErros } from '../models/classModel';
import { UpdateClass } from '../services/class/updateClass';
import { DeleteClass } from '../services/class/deleteClass';
import { validateToken } from './authController';

const classRoute = Router();

function errorMiddleware(error: any, res: Response) {
    if (Object.values(ClassErros).includes(error.message as ClassErros)) {
        res.status(400).send({ error: error.message });
    } else {
        console.error("Erro interno no servidor", error);
        res.status(500).send({ error: "Erro interno no servidor" });
    }
}

classRoute.use(validateToken);

classRoute.get('/', async (_, res) => {
    try {
        const classService = FindManyClasses.get();  
        const allClasses = await classService.execute();

        res.status(200).send(allClasses);
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

classRoute.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const classService = FindClassById.get();
        const classe = await classService.execute({ id: Number(id) });

        if(!classe) {
            res.status(404).send({ error: "Classe não encontrada" });
            return;
        }

        res.status(200).send(classe);
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

classRoute.post('/', async (req, res) => {
    const name = req.body.name;
    const classSchedule = req.body.classSchedule;

    try {
        const classService = CreateClass.get();
        const newClass = await classService.execute({
            createClasse: {
                id: undefined,
                name,
                classSchedule,
                createdAt: undefined
            }
        });

        res.status(201).send(newClass);
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

classRoute.put('/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const classSchedule = req.body.classSchedule;

    try {
        const classService = UpdateClass.get();
        const updatedClass = await classService.execute({
            updateClass: {
                id: Number(id),
                name,
                classSchedule,
                createdAt: undefined
            }
        });

        res.status(200).send(updatedClass);
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

classRoute.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const classService = DeleteClass.get();
        const deletedClass = await classService.execute({ id: Number(id) });

        if(!deletedClass) {
            res.status(404).send({ error: "Classe não encontrada" });
            return;
        }

        res.status(200).send(deletedClass);
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

export {classRoute};