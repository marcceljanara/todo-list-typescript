import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateTodoRequest, GetTodoRequest, TodoResponse, toTodoResponse, UpdateTodoRequest } from "../model/todo-model";
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

    static async getAll(): Promise<TodoResponse[]> {
        const todos = await prismaClient.todo.findMany();
        return todos.map(toTodoResponse);
    }

    static async getById(request: GetTodoRequest): Promise<TodoResponse> {
        const getRequest = Validation.validate(TodoValidation.GET, request ) as GetTodoRequest;
        const todo = await prismaClient.todo.findFirst({
            where: {
                id: getRequest.id,
            }
        })

        if (!todo) {
            throw new ResponseError(404, 'Todo not found');
        }

        return toTodoResponse(todo);
    }

    static async update(request: UpdateTodoRequest ): Promise<TodoResponse> {
        const updateRequest = Validation.validate(TodoValidation.UPDATE, request) as UpdateTodoRequest;
        await this.getById(request); // check if todo exists
        const todo = await prismaClient.todo.update({
            where: {
                id: request.id
            },
            data: updateRequest,
        });

        return toTodoResponse(todo);
    }

    static async delete(request: GetTodoRequest): Promise<TodoResponse> {
        await this.getById(request); //check if todo exists
        const todo = await prismaClient.todo.delete({
            where: {
                id: request.id,
            }
        });

        return toTodoResponse(todo);

    }
}