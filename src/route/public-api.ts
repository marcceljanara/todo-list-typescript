import express from 'express';
import { TodoController } from '../controller/todo-controller';

export const publicRouter = express.Router();
publicRouter.post('/api/todos', TodoController.create);
publicRouter.get('/api/todos', TodoController.getAll);
publicRouter.get('/api/todos/:id', TodoController.getById);
publicRouter.put('/api/todos/:id', TodoController.update);
publicRouter.delete('/api/todos/:id', TodoController.delete);