import { PrismaClient } from "@prisma/client";
import StudentModel, { StudentModelInterface } from "../models/studentModel"; 

class StudentRepository {
    private client: PrismaClient;
    private static instance: StudentRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static get(): StudentRepository {
        if (!StudentRepository.instance) {
            StudentRepository.instance = new StudentRepository();
        }
        return StudentRepository.instance;
    }

    async findManyStudents(): Promise<StudentModelInterface[]> {
        const listStudents = await this.client.student.findMany();
        return listStudents;
    }

    async findStudentById(id: number): Promise<StudentModelInterface | null> {
        const student = await this.client.student.findUnique({
            where: {
                id: id
            }
        });
        return student;
    }

    async createStudent(student: StudentModel): Promise<StudentModelInterface> {
        const newStudent = await this.client.student.create({
            data: {
                name: student.getName(),
                cpf: student.getCpf(),
                email: student.getEmail(),
                majority: student.getMajority()
            }
        });
        return newStudent;
    }

    async updateStudent(student: StudentModel): Promise<StudentModelInterface | null> {
        const updatedStudent = await this.client.student.update({
            where: {
                id: student.getId()
            },
            data: {
                name: student.getName(),
                cpf: student.getCpf(),
                email: student.getEmail(),
                majority: student.getMajority()
            }
        });
        return updatedStudent;
    }

    async deleteStudent(id: number): Promise<StudentModelInterface | null> {
        const deletedStudent = await this.client.student.delete({
            where: {
                id: id
            }
        });
        return deletedStudent;
    }
}

export default StudentRepository;