import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  apiUrl = `https://jsonplaceholder.typicode.com/todos`;

  constructor(private readonly httpService: HttpService) {}

  getHelloTodo(): string {
    try {
      return 'Hello Todo!';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'An Unexpected Error Occurred',
      });
    }
  }

  async getAllTodos(): Promise<Todo[]> {
    try {
      const response: AxiosResponse<Todo[]> = await this.httpService
        .get(this.apiUrl)
        .toPromise();

      if (!response) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Resource Not Found',
        });
      }

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'An Unexpected Error Occurred',
      });
    }
  }

  async getTodoById(id: number): Promise<Todo | undefined> {
    try {
      const response: AxiosResponse<Todo> = await this.httpService
        .get(`${this.apiUrl}/${id}`)
        .toPromise();

      if (!id) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Invalid ID',
        });
      }

      if (!response) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Resource Not Found',
        });
      }

      return response.data;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'An Unexpected Error Occurred',
      });
    }
  }
}
