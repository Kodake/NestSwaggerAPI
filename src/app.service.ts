import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Todo, TodoDTO } from './interfaces/todo.interface';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  apiUrl = `https://jsonplaceholder.typicode.com/todos`;

  constructor(private readonly httpService: HttpService) { }

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

  async getAll(): Promise<{ statusCode: number, data: Todo[] }> {
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

      return {
        statusCode: 200,
        data: response.data,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'An Unexpected Error Occurred',
      });
    }
  }

  async getTodo(id: number): Promise<{ statusCode: number, data: Todo | undefined }> {
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

      return {
        statusCode: 200,
        data: response.data,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'An Unexpected Error Occurred',
      });
    }
  }

  async createTodo(
    userId: number,
    title: string,
    completed: boolean,
  ): Promise<{ statusCode: number; message: string; data: TodoDTO }> {
    const newTodo = {
      userId: userId,
      title: title,
      completed: completed,
    };

    const response: AxiosResponse<TodoDTO> = await this.httpService
      .post(`${this.apiUrl}`, newTodo)
      .toPromise();

    if (!newTodo) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid Todo',
      });
    }

    if (!response) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Resource Not Found',
      });
    }

    return {
      statusCode: 200,
      message: `Todo Created Successfully`,
      data: response.data,
    };
  }

  async updateTodo(
    id: number,
    userId: number,
    title: string,
    completed: boolean,
  ): Promise<{ statusCode: number; message: string; data: Todo }> {
    try {
      const updatedTodo = {
        id,
        userId,
        title,
        completed,
      };

      const response: AxiosResponse<Todo> = await this.httpService
        .put(`${this.apiUrl}/${id}`, updatedTodo)
        .toPromise();

      if (!id) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Invalid ID',
        });
      }

      if (!updatedTodo) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Invalid Todo',
        });
      }

      if (!response) {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Resource Not Found',
        });
      }

      return {
        statusCode: 200,
        message: `Todo Updated Successfully`,
        data: updatedTodo,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'An Unexpected Error Occurred',
      });
    }
  }

  async deleteTodo(
    id: number,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const response: AxiosResponse<Todo> = await this.httpService
        .delete(`${this.apiUrl}/${id}`)
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

      return {
        statusCode: 200,
        message: `Todo With ID ${id} Was Deleted Successfully`,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'An Unexpected Error Occurred',
      });
    }
  }
}
