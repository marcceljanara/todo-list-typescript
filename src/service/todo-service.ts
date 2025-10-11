import { prismaClient } from "../application/database";
import { CreateTodoRequest, TodoResponse, toTodoResponse } from "../model/todo-model";
import { TodoValidation } from "../validation/todo-validation";
import { Validation } from "../validation/validation";

export class TodoService {
    static async create(request: CreateTodoRequest): Promise<TodoResponse> {
        const createRequest = Validation.validate(TodoValidation.CREATE, request) as CreateTodoRequest;
        
        const todo = await prismaClient.todo.create({
            data: createRequest
        });

        return toTodoResponse(todo);
    }
}