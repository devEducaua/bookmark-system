import { Hono } from "hono";
import { openAPIRouteHandler } from "hono-openapi";
import { swaggerUI } from "@hono/swagger-ui"
import router from "./routes";

const cont = new Hono();

cont.get("/doc", openAPIRouteHandler(router, {
    documentation: {
        info: {
            title: "Hono",
            version: "1.0.0",
            description: "API for management of bookmarks",
        },
    },
}));

cont.get("/ui", swaggerUI({ 
    url: "/doc", 
}));

export { cont as openapiController };
