import supertest from "supertest";
import { web } from '../src/application/web'
import { logger } from "../src/application/logging";
import { TodoTest } from "./test-util";

describe('POST /api/todos', () => {
    afterEach(async () => {
        await TodoTest.delete();
    })
    it('should reject create new todo if request is invalid', async () => {
        const response = await supertest(web)
            .post('/api/todos')
            .send({
                title: '',
            });

            logger.debug(response.body);
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined()
    });

    it('should create new todo if request is valid', async () => {
        const response = await supertest(web)
            .post('/api/todos')
            .send({
                title: 'test',
                description: 'test',
                status: false
            });
            logger.debug(response.body);
            expect(response.status).toBe(201);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.title).toBe('test');
            expect(response.body.data.description).toBe('test');
            expect(response.body.data.status).toBe(false);
    });
});

describe('GET /api/todos', () => {
    afterEach(async () => {
        await TodoTest.delete();
    })

    it('should return empty list if no todo', async () => {
        const response = await supertest(web)
            .get('/api/todos');

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    })

    it('should return list of todos', async () => {
        await supertest(web)
            .post('/api/todos')
            .send({
                title: 'test1',
                description: 'test1',
                status: false,
            });
        
        await supertest(web)
            .post('/api/todos')
            .send({
                title: 'test2',
                description: 'test2',
                status: true,
            });

        const response = await supertest(web)
            .get('/api/todos');

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(2);
    })
});

describe('GET /api/todos/:id', () => {
    afterEach(async () => {
        await TodoTest.delete();
    });

    it('should return 404 if todo not found', async () => {
        const response = await supertest(web)
            .get('/api/todos/9999');

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBe('Todo not found');
    });

    it('should reject if id is not a valid number', async () => {
        const response = await supertest(web)
            .get('/api/todos/abc');

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should return todo if found', async () => {
        const createResponse = await supertest(web)
            .post('/api/todos')
            .send({
                title: 'test',
                description: 'test',
                status: false,
            });

        const todoId = createResponse.body.data.id;
        const response = await supertest(web)
            .get('/api/todos/' + todoId);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.id).toBe(todoId);
        expect(response.body.data.title).toBe('test');
        expect(response.body.data.description).toBe('test');
        expect(response.body.data.status).toBe(false);
    });
});

describe('PUT /api/todos/:id', () => {
    afterEach(async () => {
        await TodoTest.delete();
    });

    it('should return 404 if todo not found', async () => {
        const response = await supertest(web)
            .put('/api/todos/9999')
            .send({
                title: 'updated',
                description: 'updated',
                status: true,
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject if id is not a valid number', async () => {
        const response = await supertest(web)
            .put('/api/todos/abc')
            .send({
                title: 'updated',
                description: 'updated',
                status: true,
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it('should reject update todo if request is invalid', async () => {
        const createResponse = await supertest(web)
            .post('/api/todos')
            .send({
                title: 'test',
                description: 'test',
                status: false,
            });

        const todoId = createResponse.body.data.id;
        const response = await supertest(web)
            .put('/api/todos/'+ todoId)
            .send({
                title: '',
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should update todo if request is valid', async () => {
        const createResponse = await supertest(web)
            .post('/api/todos')
            .send({
                title: 'test',
                description: 'test',
                status: false,
            });

        const todoId = createResponse.body.data.id;
        const response = await supertest(web)
            .put('/api/todos/'+ todoId)
            .send({
                title: 'updated',
                description: 'updated',
                status: true,
            });
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
        expect(response.body.data.id).toBe(todoId);
        expect(response.body.data.title).toBe('updated');
        expect(response.body.data.description).toBe('updated');
        expect(response.body.data.status).toBe(true);
        
    })
});