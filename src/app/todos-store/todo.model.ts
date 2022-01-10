import { ID } from '@datorama/akita';

export interface Todo {
  id: ID;
  title: string,
  description?: string,
  status?: string
}

export function createTodo(params: Partial<Todo>) {
  return {
    ...params
  } as Todo;
}
