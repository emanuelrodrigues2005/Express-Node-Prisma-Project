import { PrismaClient } from "@prisma/client";
import ClassModel, { ClassModelInterface } from "../models/classModel"; // Adjust the import path as needed

class ClassRepository {
    private client: PrismaClient;
    private static instance: ClassRepository;

    private constructor() {
        this.client = new PrismaClient();
    }

    public static get(): ClassRepository {
        if (!ClassRepository.instance) {
            ClassRepository.instance = new ClassRepository();
        }

        return ClassRepository.instance;
    }

    async findManyClasses(): Promise<ClassModelInterface[]> {
        const classes = await this.client.class.findMany();
        return classes;
    }

    async findClassById(id: number): Promise<ClassModelInterface | null> {
        const classModel = await this.client.class.findUnique({
            where: {
                id,
            },
        });

        return classModel;
    }

    async createClass(classe: ClassModel): Promise<ClassModelInterface> {
        const newClass = await this.client.class.create({
            data: {
                name: classe.getName(),
                classSchedule: classe.getClassSchedule(),
            },
        });

        return newClass;
    }

    async updateClass(classe: ClassModel): Promise<ClassModelInterface> {
        const updatedClass = await this.client.class.update({
            where: {
                id: classe.getId(),
            },
            data: {
                name: classe.getName(),
                classSchedule: classe.getClassSchedule(),
            },
        });

        return updatedClass;
    }

    async deleteClass(id: number): Promise<ClassModelInterface> {
        const deletedClass = await this.client.class.delete({
            where: {
                id,
            },
        });

        return deletedClass;
    }
}

export default ClassRepository;