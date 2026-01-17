import * as v from "valibot";

export const bookmarkResponseSchema = v.object({
    id: v.number(),
    url: v.string(),
    title: v.string(),
    description: v.nullable(v.string()),
    createdAt: v.nullable(v.date()),
    updatedAt: v.nullable(v.date()),
    userId: v.number()
});

export const bookmarkRequestSchema = v.object({
    url: v.string(),
    title: v.string(),
    description: v.string(),
})

export type BookmarkDtoResponse = v.InferInput<typeof bookmarkResponseSchema>
export type BookmarkDtoRequest = v.InferInput<typeof bookmarkRequestSchema>
