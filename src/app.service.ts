import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  apiUrl = `https://jsonplaceholder.typicode.com/todos/`;
  
  constructor(private readonly httpService: HttpService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getAllTodos(): Promise<Todo[]> {
    try {
      const response: AxiosResponse<Todo[]> = await this.httpService.get(this.apiUrl).toPromise();
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch todos');
    }
  }

  async getTodoById(id: number): Promise<Todo | undefined> {
    try {
      const response: AxiosResponse<Todo> = await this.httpService.get(`${this.apiUrl}${id}`).toPromise();
      return response.data;
    } catch (error) {
      // Handle error appropriately
      throw new Error('Failed to fetch todo by ID');
    }

  }
}
