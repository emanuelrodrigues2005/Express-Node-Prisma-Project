import { Service, ServiceOutput, ServiceInput } from "../service";
import ClassRepository from "../../repository/classRepository";
import ClassModel, { ClassModelInterface } from "../../models/classModel";

interface UpdateClassInput extends ServiceInput {
    updateClass: ClassModelInterface;
}

interface UpdateClassOutput extends ServiceOutput {
    updateClass: ClassModelInterface | null;
}

export class UpdateClass implements Service {
    private static instance: UpdateClass;
    private repository: ClassRepository;

    private constructor() {
        this.repository = ClassRepository.get();
    }

    public static get(): UpdateClass {
        if (!UpdateClass.instance) {
            UpdateClass.instance = new UpdateClass();
        }

        return UpdateClass.instance;
    }
    
    public async execute({updateClass}: UpdateClassInput): Promise<UpdateClassOutput> {
        const classObject = new ClassModel(updateClass.id, updateClass.name, updateClass.classSchedule);
        const updatedClass = await this.repository.updateClass(classObject);

        return { updateClass: updatedClass };
    }
}