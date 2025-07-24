import { Service, ServiceOutput, ServiceInput } from "../service";
import ClassRepository from "../../repository/classRepository";
import { ClassModelInterface } from "../../models/classModel";

interface FindManyClassesInput extends ServiceInput {
}

interface FindManyClassesOutput extends ServiceOutput {
    allClasses: ClassModelInterface[];
}

export class FindManyClasses implements Service {
    private static instance: FindManyClasses;
    private repository: ClassRepository;

    private constructor() {
        this.repository = ClassRepository.get();
    }

    public static get(): FindManyClasses {
        if (!FindManyClasses.instance) {
            FindManyClasses.instance = new FindManyClasses();
        }

        return FindManyClasses.instance;
    }
    
    public async execute(): Promise<FindManyClassesOutput> {
        const allClasses = await this.repository.findManyClasses();
        return { allClasses };
    }
}