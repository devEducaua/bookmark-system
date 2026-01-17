import * as jose from "jose";

export default class AuthService {
    login(userId: number) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

        const token = new jose.SignJWT({ userId: userId }).setProtectedHeader({ alg: "HS256" })
                              .setExpirationTime("2h")
                              .sign(secret);

        return token;
    }
}
