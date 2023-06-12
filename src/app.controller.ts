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
  constructor(private appService: AppService) {}

  @ApiExtraModels(Todos)
  @Get('getAll')
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiNotFoundResponse({ description: 'Not Found Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async all(): Promise<Todo[]> {
    return await this.appService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async get(@Param('id') id: string): Promise<Todo | undefined> {
    return await this.appService.getTodo(parseInt(id, 10));
  }

  @Post()
  @HttpCode(200)
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async post(
    @Param('userId') userId: number,
    @Param('title') title: string,
    @Param('completed') completed: boolean,
  ): Promise<{ statusCode: number; message: string; data: TodoDTO }> {
    return await this.appService.createTodo(userId, title, completed);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async update(
    @Param('id') id: number,
    @Body('userId') userId: number,
    @Body('title') title: string,
    @Body('completed') completed: boolean,
  ): Promise<{ statusCode: number; message: string; data: Todo }> {
    var updatedTodo = {
      id,
      userId,
      title,
      completed,
    };

    return await this.appService.updateTodo(id, userId, title, completed);
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
