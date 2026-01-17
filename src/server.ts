import { Context, Hono } from "hono";
import { jwt } from "hono/jwt";
import { userController } from "./controllers/userController";
import { bookmarkController } from "./controllers/bookmarkController";
import { DomainError, AuthError, NotFoundError } from "./utils/errors";

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

app.use(
    "/bookmarks/*",
    jwt({
        secret: process.env.JWT_SECRET!
    })
)

app.route("/users", userController);
app.route("/bookmarks", bookmarkController);

export default {
    fetch: app.fetch,
    port: 8080
}
