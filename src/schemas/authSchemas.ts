import * as v from "valibot";

export const authLoginSchema = v.object({
    email: v.string(),
    password: v.string()
})

export type AuthDtoRequest = v.InferInput<typeof authLoginSchema>
