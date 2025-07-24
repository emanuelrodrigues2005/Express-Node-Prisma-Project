import { Router, Request, Response } from 'express';
import { FindManyStudents } from '../services/student/findManyStudents';
import { FindStudentById } from '../services/student/findStudentById';
import { StudentErros } from '../models/studentModel';
import { CreateStudent } from '../services/student/createStudent';
import { UpdateStudent } from '../services/student/updateStudent';
import { DeleteStudent } from '../services/student/deleteStudent';
import { validateToken } from './authController';

const studentRoute = Router();

function errorMiddleware(error: any, res: Response) {
    if (Object.values(StudentErros).includes(error.message as StudentErros)) {
        res.status(400).send({ error: error.message });
    } else {
        console.error("Erro interno no servidor", error);
        res.status(500).send({ error: "Erro interno no servidor" });
    }
}

studentRoute.use(validateToken);

studentRoute.get('/', async (_, res) => {
    try {
       const studentService = FindManyStudents.get();
        const allStudents = await studentService.execute();

        res.status(200).send(allStudents); 
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

studentRoute.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const studentService = FindStudentById.get();
        const student = await studentService.execute({ id: Number(id) });

        if(!student) {
            res.status(404).send({ error: "Estudante não encontrado" });
            return;
        }

        res.status(200).send(student);
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

studentRoute.post('/', async (req, res) => {
    const name = req.body.name;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const majority = req.body.majority;

    try {
        const studentService = CreateStudent.get();
        const newStudent = await studentService.execute({
            student: {
                id: undefined,
                name,
                cpf,
                email,
                majority,
                createdAt: undefined
            }
        });

        res.status(201).send(newStudent);
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

studentRoute.put('/:id', async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const majority = req.body.majority;

    try {
        const studentService = UpdateStudent.get();
        const updatedStudent = await studentService.execute({
            student: {
                id: Number(id),
                name,
                cpf,
                email,
                majority,
                createdAt: undefined
            }
        });

        if(!updatedStudent) {
            res.status(404).send({ error: "Estudante não encontrado" });
            return;
        }

        res.status(200).send(updatedStudent);
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

studentRoute.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const studentService = DeleteStudent.get();
        const deletedStudent = await studentService.execute({ id: Number(id) });

        if(!deletedStudent) {
            res.status(404).send({ error: "Estudante não encontrado" });
            return;
        }

        res.status(200).send(deletedStudent);
    } catch (error: any) {
        errorMiddleware(error, res);
    }
});

export { studentRoute };