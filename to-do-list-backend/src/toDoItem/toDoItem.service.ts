import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToDoItem } from '../typeorm/toDoItem.entity';

@Injectable()
export class ToDoItemService {
    constructor(
        @InjectRepository(ToDoItem)
        private readonly toDoItemRepository: Repository<ToDoItem>,
    ) {}

    async getAll(): Promise<ToDoItem[]> {
        return this.toDoItemRepository.find();
    }

    async createItem(data: Partial<ToDoItem>): Promise<ToDoItem> {
        const toDoItem = this.toDoItemRepository.create(data);
        return this.toDoItemRepository.save(toDoItem);
    }

    async updateItem(id: number, data: Partial<ToDoItem>): Promise<ToDoItem | undefined> {
        await this.toDoItemRepository.update(id, data);
        return this.toDoItemRepository.findOneBy({id: id});
    }

    async deleteItem(id: number): Promise<void> {
        await this.toDoItemRepository.delete(id);
    }
}