export type CreateToDoItemDto = {
    dueDate: Date | null;
    title: string;
    description: string;
 }

export type UpdateUserDto = {
    dueDate: Date;
    title: string;
    description: string;
    completed: boolean;
}