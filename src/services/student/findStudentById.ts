import { Service, ServiceOutput, ServiceInput } from "../service";
import { StudentModelInterface } from "../../models/studentModel";
import StudentRepository from "../../repository/studentRepository";

interface FindStudentByIdInput extends ServiceInput {
    id: number;
}

interface FindStudentByIdOutput extends ServiceOutput {
    student: StudentModelInterface | null;
}

export class FindStudentById implements Service {
    private static instance: FindStudentById;
    private repository: StudentRepository;

    private constructor() {
        this.repository = StudentRepository.get();
    }

    public static get(): FindStudentById {
        if (!FindStudentById.instance) {
            FindStudentById.instance = new FindStudentById();
        }

        return FindStudentById.instance;
    }
    
    public async execute({ id }: FindStudentByIdInput): Promise<FindStudentByIdOutput> {
        const student = await this.repository.findStudentById(id);
        return { student };
    }
}