import * as v from "valibot";

export const userResponseSchema = v.object({
    id: v.number(),
    name: v.string(),
    email: v.string(),
    password: v.string(),
});

export const userRequestSchema = v.object({
    name: v.string(),
    email: v.string(),
    password: v.string()
})

export type UserDtoResponse = v.InferInput<typeof userResponseSchema>
export type UserDtoRequest = v.InferInput<typeof userRequestSchema>
