import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ToDoItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dueDate: Date;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    completed: boolean;
}