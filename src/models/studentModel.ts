import { MajorityEnum } from "@prisma/client";

class StudentModel {
    private id: number | undefined;
    private name: string;
    private cpf: string;
    private email: string;
    private majority: MajorityEnum;
    private createdAt: Date;

    constructor(id: number | undefined, name: string, cpf: string, email: string, majority: MajorityEnum) {
        this.id = id;

        if(!name || name.trim() === "") {
            throw new Error(StudentErros.INVALID_NAME);
        }
        this.name = name;

        if(!cpf || cpf.trim() === "") {
            throw new Error(StudentErros.INVALID_CPF);
        }
        this.cpf = cpf;

        if(!email || email.trim() === "") {
            throw new Error(StudentErros.INVALID_EMAIL);
        }
        this.email = email;

        if (!Object.values(MajorityEnum).includes(majority)) {
            throw new Error(StudentErros.INVALID_MAJORITY);
        }
        this.majority = majority;
        this.createdAt = new Date();
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getCpf(): string {
        return this.cpf;
    }

    public getEmail(): string {
        return this.email;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getMajority(): MajorityEnum {
        return this.majority;
    }
}

export default StudentModel;

export interface StudentModelInterface {
    id: number | undefined;
    name: string;
    cpf: string;
    email: string;
    majority: MajorityEnum;
    createdAt: Date | undefined;
}

export enum StudentErros {
    INVALID_NAME = "Invalid name",
    INVALID_CPF = "Invalid CPF",
    INVALID_EMAIL = "Invalid email",
    INVALID_MAJORITY = "Invalid majority"
}