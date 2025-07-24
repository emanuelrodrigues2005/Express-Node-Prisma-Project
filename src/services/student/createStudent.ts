import { Service, ServiceOutput, ServiceInput } from "../service";
import StudentModel, { StudentModelInterface } from "../../models/studentModel";
import StudentRepository from "../../repository/studentRepository";

interface CreateStudentInput extends ServiceInput {
    student: StudentModelInterface;
}

interface CreateStudentOutput extends ServiceOutput {
    student: StudentModelInterface;
}

export class CreateStudent implements Service {
    private static instance: CreateStudent;
    private repository: StudentRepository;

    private constructor() {
        this.repository = StudentRepository.get();
    }

    public static get(): CreateStudent {
        if (!CreateStudent.instance) {
            CreateStudent.instance = new CreateStudent();
        }

        return CreateStudent.instance;
    }
    
    public async execute({ student }: CreateStudentInput): Promise<CreateStudentOutput> {
        try {
            const studentObj = new StudentModel(student.id, student.name, student.cpf, student.email, student.majority);
            const newStudent = await this.repository.createStudent(studentObj);

            return { student: newStudent };
        } catch (error) {
            if(error instanceof Error) {
                if(error.message.includes("cpf")) {
                    throw new Error("CPF already registered");
                }

                if(error.message.includes("email")) {
                    throw new Error("Email already registered");
                }
            }

            throw new Error("Unspecified error creating student");
        }
    }
}