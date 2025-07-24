class ClassModel {
    private id: number | undefined;
    private name: string;
    private classSchedule: string;
    private createdAt: Date;

    constructor(id: number | undefined, name: string, classSchedule: string) {
        this.id = id;

        if(!name || name.trim() === "") {
            throw new Error(ClassErros.INVALID_NAME);
        }
        this.name = name;

        if(!classSchedule || classSchedule.trim() === "") {
            throw new Error(ClassErros.INVALID_CLASS_SCHEDULE);
        }
        this.classSchedule = classSchedule;
        this.createdAt = new Date();
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getClassSchedule(): string {
        return this.classSchedule;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }
}

export default ClassModel;

export interface ClassModelInterface {
    id: number | undefined;
    name: string;
    classSchedule: string;
    createdAt: Date | undefined;
}

export enum ClassErros {
    INVALID_NAME = "Invalid name",
    INVALID_CLASS_SCHEDULE = "Invalid class schedule"
}