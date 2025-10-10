import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString });

import { logger } from './logging';

export const prismaClient = new PrismaClient({ adapter,
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ]
});

prismaClient.$on("error", (e: any) => {
    logger.error(e);
})

prismaClient.$on("warn", (e: any) => {
    logger.warn(e);
})

prismaClient.$on("info", (e: any) => {
    logger.info(e);
})

prismaClient.$on("query", (e: any) => {
    logger.info(e);
})
