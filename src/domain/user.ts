import { DomainError } from "../utils/errors";

export default class User {
    private name: string;
    private email: string;
    private password: string;

    constructor(name: string, email: string, password: string) {
        this.setName(name);
        this.setEmail(email);
        this.setPassword(password);
    }

    public setName(name: string) {
        this.notNull(name, "name");
        if (name.length > 100) throw new DomainError("user name cannot be greater than 100 characters");

        this.name = name;
    }

    public setEmail(email: string) {
        this.notNull(email, "email");
        if (!email.includes("@")) throw new DomainError("user email invalid");

        this.email = email;
    }

    public setPassword(password: string) {
        this.notNull(password, "password");

        this.password = password;
    }

    private notNull(value: string, type: string) {
        if (!value || value.trim() == "") throw new DomainError(`user ${type} cannot be null`);
    }

    public deconstruct() {
        return {
            name: this.name,
            email: this.email,
            password: this.password
        }
    }
}
