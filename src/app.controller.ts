import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Todo } from './interfaces/todo.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api')
@ApiBearerAuth()
export class AppController {
  constructor(private appService: AppService) { }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getAllTodos')
  async getAllTodos(): Promise<Todo[]> {
    return await this.appService.getAllTodos();
  }

  @Get('getTodo/:id')
  async getTodoById(@Param('id') id: string): Promise<Todo | undefined> {
    return await this.appService.getTodoById(parseInt(id, 10));
  }
}
