import { NextFunction, Request, Response } from "express";
import { CreateTodoRequest, FilterTodoRequest, GetTodoRequest, UpdateTodoRequest } from "../model/todo-model";
import { TodoService } from "../service/todo-service";

export class TodoController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateTodoRequest = req.body as CreateTodoRequest;
            const response = await TodoService.create(request);
            res.status(201).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try { 
            const request: FilterTodoRequest = {
                status: Boolean(req.query.status) || undefined,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await TodoService.getAll(request);
            res.status(200).json(response);
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
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UpdateTodoRequest = req.body as UpdateTodoRequest;
            request.id = Number(req.params.id);
            const response = await TodoService.update(request);
            res.status(200).json({
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const request: GetTodoRequest = {
                id: Number(req.params.id),
            };
            const response = await TodoService.delete(request);
            res.status(200).json({
                data: 'OK',
            });
            
        } catch (error) {
            next(error);
        }
    }
}