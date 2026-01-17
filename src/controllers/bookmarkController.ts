import { Hono, Context } from "hono";
import BookmarkService from "../services/bookmarkService";
import { BookmarkDtoRequest, bookmarkResponseSchema } from "../schemas/bookmarkSchemas";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as v from "valibot";
import { userRequestSchema } from "../schemas/userSchemas";

const cont = new Hono();

const serv = new BookmarkService();

cont.get("/", describeRoute({
        description: "get all bookmark",
        responses: {
            200: {
                description: "successful response",
                content: {
                    "application/json": { schema: resolver(v.array(bookmarkResponseSchema)) }
                }
            }
        }
    }),
    async (c: Context) => {
    const result = await serv.getAll();

    return c.json({ data: result });
})

cont.get("/:id", describeRoute({
        description: "get one bookmark",
        responses: {
            200: {
                description: "successful response",
                content: {
                    "application/json": { schema: resolver(bookmarkResponseSchema) }
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
        description: "creates a new bookmark",
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
    const payload = c.get("jwtPayload");
    const dto: BookmarkDtoRequest = await c.req.json();

    const id = await serv.create(dto, payload.userId);

    return c.json({ bookmark: ` with id: ${id} created` }, 201);
})

cont.put("/:id", describeRoute({
        description: "updates a bookmark",
        responses: {
            200: {
                description: "successfully created",
                content: {
                    "application/json": { schema: resolver(v.string()) }
                }
            }
        }
    }),
    validator("json", userRequestSchema),
    async (c: Context) => {
    const id = c.req.param("id");
    const dto: BookmarkDtoRequest = await c.req.json();

    await serv.update(dto, Number(id));

    return c.json({ bookmark: ` with id: ${id} updated` }, 200);
})

cont.delete("/:id", describeRoute({
        description: "deletes a bookmark",
        responses: {
            204: {
                description: "successfully deleted",
            }
        }
    }),
    validator("query", v.string()),
    async (c: Context) => {
    const id = c.req.param("id");

    await serv.delete(Number(id));

    return c.status(204);
})

export { cont as bookmarkController };
