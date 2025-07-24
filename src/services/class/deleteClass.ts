import { Service, ServiceOutput, ServiceInput } from "../service";
import ClassRepository from "../../repository/classRepository";
import { ClassModelInterface } from "../../models/classModel";

interface DeleteClassInput extends ServiceInput {
    id: number
}

interface DeleteClassOutput extends ServiceOutput {
    message: string;
}

export class DeleteClass implements Service {
    private static instance: DeleteClass;
    private repository: ClassRepository;

    private constructor() {
        this.repository = ClassRepository.get();
    }

    public static get(): DeleteClass {
        if (!DeleteClass.instance) {
            DeleteClass.instance = new DeleteClass();
        }

        return DeleteClass.instance;
    }
    
    public async execute({id}: DeleteClassInput): Promise<DeleteClassOutput> {
        await this.repository.deleteClass(id);
        return { message: "Class deleted successfully" };
    }
}