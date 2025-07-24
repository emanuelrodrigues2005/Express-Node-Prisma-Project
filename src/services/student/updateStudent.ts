import { Service, ServiceOutput, ServiceInput } from "../service";
import StudentModel, { StudentModelInterface } from "../../models/studentModel";
import StudentRepository from "../../repository/studentRepository";

interface UpdateStudentInput extends ServiceInput {
    student: StudentModelInterface;
}

interface UpdateStudentOutput extends ServiceOutput {
    student: StudentModelInterface | null;
}

export class UpdateStudent implements Service {
    private static instance: UpdateStudent;
    private repository: StudentRepository;

    private constructor() {
        this.repository = StudentRepository.get();
    }

    public static get(): UpdateStudent {
        if (!UpdateStudent.instance) {
            UpdateStudent.instance = new UpdateStudent();
        }

        return UpdateStudent.instance;
    }
    
    public async execute({ student }: UpdateStudentInput): Promise<UpdateStudentOutput> {
        const studentObj = new StudentModel(student.id, student.name, student.cpf, student.email, student.majority);

        const updatedStudent = await this.repository.updateStudent(studentObj);
        
        return { student: updatedStudent };
    }
}