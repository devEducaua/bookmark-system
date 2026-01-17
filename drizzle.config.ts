import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/schema.ts",
    out: "./src/db/drizzle",
    casing: "snake_case",
    dbCredentials: {
        url: process.env.DB_URL!
    }
})
