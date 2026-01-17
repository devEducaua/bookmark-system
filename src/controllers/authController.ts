import { Hono, Context } from "hono";
import UserService from "../services/userService";
import AuthService from "../services/authService";
import { AuthDtoRequest, authLoginSchema } from "../schemas/authSchemas";
import { describeRoute, resolver, validator } from "hono-openapi";
import * as v from "valibot";

const cont = new Hono();
const userService = new UserService();
const authService = new AuthService();

cont.post("/login", describeRoute({
        description: "login a user",
        responses: {
            200: {
                description: "successfully logged",
                content: {
                    "application/json": { schema: resolver(v.string()) }
                }
            },
            401: {
                description: "invalid credentials",
                content: {
                    "application/json": { schema: resolver(v.string()) }
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
    validator("json", authLoginSchema),
    async (c: Context) => {
    const dto: AuthDtoRequest = await c.req.json();

    const id = await userService.authenticate(dto);

    const token = await authService.login(id);

    return c.json({ token: token });
})

export { cont as authController };
