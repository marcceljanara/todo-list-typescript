import express from 'express';
import { TodoController } from '../controller/todo-controller';

export const publicRouter = express.Router();
publicRouter.post('/api/todos', TodoController.create);
publicRouter.get('/api/todos', TodoController.getAll);
