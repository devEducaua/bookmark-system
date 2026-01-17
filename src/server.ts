import { Context, Hono } from "hono";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { DomainError, AuthError, NotFoundError } from "./utils/errors";
import router from "./routes";

const app = new Hono().basePath("/api");

app.onError((err: Error, c: Context) => {
    if (err instanceof DomainError)
        return c.json({ err: err.message }, 400);

    if (err instanceof AuthError)
        return c.json({ err: err.message }, 401);

    if (err instanceof NotFoundError)
        return c.json({ err: err.message }, 404);

    return c.json({ err: "internal server error" }, 500);

})

app.use(logger());

app.use(
    "/bookmarks/*",
    jwt({
        secret: process.env.JWT_SECRET!,
        alg: "HS256"
    })
)

app.route("/", router);

export default {
    fetch: app.fetch,
    port: 8080
}
