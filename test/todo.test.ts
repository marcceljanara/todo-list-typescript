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