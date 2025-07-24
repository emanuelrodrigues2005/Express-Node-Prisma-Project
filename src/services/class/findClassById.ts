import { Service, ServiceOutput, ServiceInput } from "../service";
import ClassRepository from "../../repository/classRepository";
import { ClassModelInterface } from "../../models/classModel";

interface FindClassByIdInput extends ServiceInput {
    id: number;
}

interface FindClassByIdOutput extends ServiceOutput {
    classe: ClassModelInterface | null;
}

export class FindClassById implements Service {
    private static instance: FindClassById;
    private repository: ClassRepository;

    private constructor() {
        this.repository = ClassRepository.get();
    }

    public static get(): FindClassById {
        if (!FindClassById.instance) {
            FindClassById.instance = new FindClassById();
        }

        return FindClassById.instance;
    }
    
    public async execute({id}: FindClassByIdInput): Promise<FindClassByIdOutput> {
        const classe = await this.repository.findClassById(id);
        return { classe };
    }
}