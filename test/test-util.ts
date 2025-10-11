import { prismaClient } from "../src/application/database";

export class TodoTest {
    static async delete() {
        await prismaClient.todo.deleteMany({});
    }
}