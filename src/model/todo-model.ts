import { Todo } from "@prisma/client"

export type TodoResponse = {
    id: number,
    title: string,
    description: string | null,
    status: boolean,
    created_at: Date,
    updated_at: Date,
}

export type CreateTodoRequest = {
    title: string,
    description?: string | null,
    status?: boolean,
}

export type UpdateTodoRequest = {
    id: number,
    title?: string,
    description?: string | null,
    status?: boolean, 
}

export type GetTodoRequest = {
    id: number,
}

export type FilterTodoRequest = {
    status?: boolean,
    page: number,
    size: number,
}

export function toTodoResponse(todo: Todo): TodoResponse {
    return {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        created_at: todo.created_at,
        updated_at: todo.updated_at,
    }
}

