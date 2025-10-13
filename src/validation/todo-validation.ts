import z, { ZodType } from "zod";

export class TodoValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).max(100),
        description: z.string().optional(),
        status: z.boolean().optional(),
    });

    static readonly GET: ZodType = z.object({
        id: z.number().min(1).positive(),
     });

     static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        title: z.string().min(1).max(100),
        description: z.string().optional(),
        status: z.boolean().optional(),
     });
}