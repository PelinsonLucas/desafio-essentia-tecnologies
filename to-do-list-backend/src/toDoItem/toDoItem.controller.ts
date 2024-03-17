import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { ToDoItemService } from './toDoItem.service';
import { CreateToDoItemDto } from './createToDoItem.dto';
import { UpdateToDoItemDto } from './updateToDoItem.dto';

@Controller('toDoItem')
export class ToDoItemController {
    
    constructor(private toDoItemService: ToDoItemService) {};

    @Get('/all')
    getAll(): Promise<any> {
        return this.toDoItemService.getAll();
    }

    @Post()
    createItem(@Body() CreateToDoItemDto: CreateToDoItemDto){
        return this.toDoItemService.createItem(CreateToDoItemDto);
    }

    @Put(':id')
    async updateItem(@Param('id', ParseIntPipe) id: number, @Body() UpdateToDoItemDto: UpdateToDoItemDto) {
        await this.toDoItemService.updateItem(id, UpdateToDoItemDto);
    }

    @Delete(':id')
    async deleteItem(@Param('id', ParseIntPipe) id: number) {
        await this.toDoItemService.deleteItem(id);
    }

}