import { Service, ServiceOutput, ServiceInput } from "../service";
import ClassRepository from "../../repository/classRepository";
import ClassModel, { ClassModelInterface } from "../../models/classModel";

interface CreateClassInput extends ServiceInput {
    createClasse: ClassModelInterface;
}

interface CreateClassOutput extends ServiceOutput {
    createClasse: ClassModelInterface;
}

export class CreateClass implements Service {
    private static instance: CreateClass;
    private repository: ClassRepository;

    private constructor() {
        this.repository = ClassRepository.get();
    }

    public static get(): CreateClass {
        if (!CreateClass.instance) {
            CreateClass.instance = new CreateClass();
        }

        return CreateClass.instance;
    }
    
    public async execute({ createClasse }: CreateClassInput): Promise<CreateClassOutput> {
        const classObject = new ClassModel(createClasse.id, createClasse.name, createClasse.classSchedule);
        const newClass = await this.repository.createClass(classObject);

        return { createClasse: newClass };
    }
}