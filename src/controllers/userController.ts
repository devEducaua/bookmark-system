import { Hono, Context } from "hono";
import UserService from "../services/userService";
import { UserDtoRequest } from "../dtos/userDto";
import { describeRoute, resolver, validator } from 'hono-openapi'
import { userResponseSchema, userRequestSchema } from "../schemas/userSchemas";
import * as v from "valibot";

const cont = new Hono();

const serv = new UserService();

cont.get("/", describeRoute({
    description: "get all users",
    responses: {
        200: {
            description: "successful response",
            content: {
                "application/json": { schema: resolver(v.array(userResponseSchema)) }
            }
        }
    }
    }), 
    async (c: Context) => {
    const result = await serv.getAll();

    return c.json({ data: result });
})

cont.get("/:id", describeRoute({
        description: "get one user",
        responses: {
            200: {
                description: "successfully response",
                content: {
                    "application/json": { schema: resolver(userResponseSchema) }
                }
            },
            404: {
                description: "user not found",
                content: {
                    "application/json": { schema: resolver(v.string()) }
                }
            }
        }
    }),
    validator("query", v.string()),
    async (c: Context) => {
    const id = c.req.param("id");
    const result = await serv.getOne(Number(id));

    return c.json(result);
})

cont.post("/", describeRoute({
        description: "create a new user",
        responses: {
            201: {
                description: "successfully created",
                content: {
                    "application/json": { schema: resolver(v.string()) }
                }
            }
        }
    }),
    validator("json", userRequestSchema),
    async (c: Context) => {
    const dto: UserDtoRequest = await c.req.json();

    const id = await serv.create(dto);

    return c.json({ user: `with id: ${id} created` }, 201);
})

cont.put("/:id", describeRoute({
        description: "updates a user",
        responses: {
            200: {
                description: "successfully updated",
                content: {
                    "application/json": { schema: resolver(v.string()) }
                }
            }
        }
    }),
    validator("query", v.string()),
    validator("json", userRequestSchema),
    async (c: Context) => {
    const id = c.req.param("id");
    const dto: UserDtoRequest = await c.req.json();

    await serv.update(dto, Number(id));

    return c.json({ user: `with id: ${id} updated` }, 200);
})

cont.delete("/:id", describeRoute({
        description: "deletes a user",
        responses: {
            204: {
                description: "successfully deleted"
            }
        }
    }),
    validator("query", v.string()),
    async (c: Context) => {
    const id = c.req.param("id");

    await serv.delete(Number(id));

    return c.status(204);
})

export { cont as userController };
