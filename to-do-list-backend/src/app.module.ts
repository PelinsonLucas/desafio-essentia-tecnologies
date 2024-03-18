import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoItem } from './typeorm/toDoItem.entity';
import { ToDoItemModule } from './toDoItem/toDoItem.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'todolist',
    entities: [ToDoItem],
    synchronize: true,
  }), ToDoItemModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
