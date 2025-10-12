import { NextFunction, Request, Response } from "express";
import { CreateTodoRequest, GetTodoRequest } from "../model/todo-model";
import { TodoService } from "../service/todo-service";

export class TodoController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateTodoRequest = req.body as CreateTodoRequest;
            const response = await TodoService.create(request);
            return res.status(201).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await TodoService.getAll();
            return res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const request: GetTodoRequest = {
                id: Number(req.params.id),
            };
            const response = await TodoService.getById(request);
            return res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}