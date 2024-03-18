import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoItem } from '../typeorm/toDoItem.entity';
import { ToDoItemController } from './toDoItem.controller';
import { ToDoItemService } from './toDoItem.service';

@Module({
    imports: [TypeOrmModule.forFeature([ToDoItem])],
    controllers: [ToDoItemController],
    providers: [ToDoItemService],
})
export class ToDoItemModule {}