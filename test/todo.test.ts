import supertest from "supertest";
import { web } from '../src/application/web'
import { logger } from "../src/application/logging";

describe('POST /api/todos', () => {
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
});