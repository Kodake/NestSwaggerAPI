import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Todos, Todo, TodoDTO } from './interfaces/todo.interface';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('api/todos')
@ApiTags('Todos')
@ApiBearerAuth()
export class AppController {
  constructor(private appService: AppService) { }

  @ApiExtraModels(Todos)
  @HttpCode(200)
  @Get('getAll')
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiNotFoundResponse({ description: 'Not Found Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async all(): Promise<{ statusCode: number; data: Todo[] }> {
    return await this.appService.getAll();
  }

  @ApiExtraModels(Todos)
  @HttpCode(200)
  @Get(':id')
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async get(@Param('id') id: string): Promise<{statusCode: number, data: Todo | undefined}> {
    return await this.appService.getTodo(parseInt(id, 10));
  }

  @Post()
  @HttpCode(200)
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async post(
    @Body() todo: TodoDTO
  ): Promise<{ statusCode: number; message: string; data: TodoDTO }> {    
    return await this.appService.createTodo(todo.userId, todo.title, todo.completed);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async update(
    @Param('id') id: number,
    @Body() updTodo: TodoDTO
  ): Promise<{ statusCode: number; message: string; data: TodoDTO }> {
    return await this.appService.updateTodo(id, updTodo.userId, updTodo.title, updTodo.completed);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async delete(
    @Param('id') id: number,
  ): Promise<{ statusCode: number; message: string }> {
    return await this.appService.deleteTodo(id);
  }
}
