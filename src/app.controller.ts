import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Todo } from './interfaces/todo.interface';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('api')
@ApiTags('Todos endpoints')
@ApiBearerAuth()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('helloTodo')
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  getHello(): string {
    return this.appService.getHelloTodo();
  }

  @Get('getTodos')
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiNotFoundResponse({ description: 'Not Found Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAllTodos(): Promise<Todo[]> {
    return await this.appService.getAllTodos();
  }

  @Get('getTodo/:id')
  @ApiOkResponse({ description: 'Successful Request' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getTodoById(@Param('id') id: string): Promise<Todo | undefined> {
    return await this.appService.getTodoById(parseInt(id, 10));
  }
}
