import { Hono, Context } from "hono";
import { UserDtoRequest } from "../dtos/userDto";
import UserService from "../services/userService";
import AuthService from "../services/authService";

const cont = new Hono();
const userService = new UserService();
const authService = new AuthService();

cont.post("/login", async (c: Context) => {
    const dto: UserDtoRequest = await c.req.json();

    const id = await userService.authenticate(dto);

    const token = await authService.login(id);

    return c.json({ token: token });
})

export { cont as authController };
