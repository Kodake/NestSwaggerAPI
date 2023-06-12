import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class Todo {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  completed: boolean;
}

@ApiExtraModels(Todo)
export class TodoDTO {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  completed: boolean;
}

@ApiExtraModels(Todo)
export class Todos {
  @ApiProperty({ type: [Todo] }) // Use type: [User] to indicate an array of User objects
  todos: Todo[];
}