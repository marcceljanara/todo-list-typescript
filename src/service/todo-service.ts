import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import { CreateTodoRequest, FilterTodoRequest, GetTodoRequest, TodoResponse, toTodoResponse, UpdateTodoRequest } from "../model/todo-model";
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

    static async getAll(request: FilterTodoRequest): Promise<Pageable<TodoResponse>> {
        const filterRequest = Validation.validate(TodoValidation.FILTER, request) as FilterTodoRequest;
        const skip = (filterRequest.page - 1) * filterRequest.size;
        

        const todos = await prismaClient.todo.findMany({
            where: {
                status: filterRequest.status
            },
            take: filterRequest.size,
            skip: skip
        });

        const total = await prismaClient.todo.count({
            where: {
                status: filterRequest.status
            }
        });

        return {
            data: todos.map(toTodoResponse),
            paging: {
                size: filterRequest.size,
                total_page: Math.ceil(total / filterRequest.size),
                current_page: filterRequest.page,
            }
        }
        
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