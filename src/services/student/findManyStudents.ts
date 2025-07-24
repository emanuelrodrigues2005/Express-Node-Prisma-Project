import { Service, ServiceOutput, ServiceInput } from "../service";
import { StudentModelInterface } from "../../models/studentModel";
import StudentRepository from "../../repository/studentRepository";

interface FindManyStudentsInput extends ServiceInput {
}

interface FindManyStudentsOutput extends ServiceOutput {
  allStudents: StudentModelInterface[];
}

export class FindManyStudents implements Service {
    private static instance: FindManyStudents;
    private repository: StudentRepository;

    private constructor() {
        this.repository = StudentRepository.get();
    }

    public static get(): FindManyStudents {
        if (!FindManyStudents.instance) {
            FindManyStudents.instance = new FindManyStudents();
        }

        return FindManyStudents.instance;
    }
    
    public async execute(): Promise<FindManyStudentsOutput> {
        const allStudents = await this.repository.findManyStudents();
        return { allStudents };
    }
}