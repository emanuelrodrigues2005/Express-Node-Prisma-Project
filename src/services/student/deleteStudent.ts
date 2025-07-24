import { Service, ServiceOutput, ServiceInput } from "../service";
import StudentRepository from "../../repository/studentRepository";

interface DeleteStudentInput extends ServiceInput {
    id: number;
}

interface DeleteStudentOutput extends ServiceOutput {
    message: string;
}

export class DeleteStudent implements Service {
    private static instance: DeleteStudent;
    private repository: StudentRepository;

    private constructor() {
        this.repository = StudentRepository.get();
    }

    public static get(): DeleteStudent {
        if (!DeleteStudent.instance) {
            DeleteStudent.instance = new DeleteStudent();
        }

        return DeleteStudent.instance;
    }
    
    public async execute({ id }: DeleteStudentInput): Promise<DeleteStudentOutput> {
        await this.repository.deleteStudent(id);
        return { message: "Student deleted successfully" };
    }
}