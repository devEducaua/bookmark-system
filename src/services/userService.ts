import { eq } from "drizzle-orm";
import db from "../db";
import { usersTable } from "../db/schema";
import { UserDtoRequest, UserDtoResponse } from "../schemas/userSchemas";
import User from "../domain/user";
import { AuthDtoRequest } from "../schemas/authSchemas";
import { AuthError } from "../utils/errors";

export default class UserService {

    async authenticate(dto: AuthDtoRequest) {
        const { email, password } = dto;

        const [result] = await db.select({ id: usersTable.id, password: usersTable.password }).from(usersTable).where(eq(usersTable.email, email));
        const dbPassword = result.password;

        const isValid: boolean = await Bun.password.verify(password, dbPassword);

        if (!isValid) throw new AuthError("invalid credentials");

        return result.id;
    }
    
    async getAll(): Promise<UserDtoResponse[]> {
        const result = await db.select().from(usersTable);
        return result; }

    async getOne(id: number): Promise<UserDtoResponse> {
        const [result] = await db.select().from(usersTable).where(eq(usersTable.id, id));
        return result;
    }

    async create(dto: UserDtoRequest) {
        const { name, email, password } = dto;

        new User(name, email, password);

        const hash = await Bun.password.hash(password, { algorithm: "argon2d" });

        const [result] = await db.insert(usersTable)
                                 .values({ name, email, password: hash }) .returning({ id: usersTable.id });

        return result.id;
    }

    async update(dto: UserDtoRequest, id: number) {
        const { name, email, password } = dto;

        new User(name, email, password);

        await db.update(usersTable)
                 .set({ name: name, email: email, password: password })
                 .where(eq(usersTable.id, id))
    }

    async delete(id: number) {
        await db.delete(usersTable).where(eq(usersTable.id, id));
    }
}
