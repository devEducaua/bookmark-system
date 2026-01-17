import { DomainError } from "../utils/errors";

export default class Bookmark {
    private url: string;
    private title: string;
    private description: string;

    constructor(url: string, title: string, description: string) {
        this.setUrl(url);
        this.setTitle(title);
        this.setDescription(description);
    }

    public setUrl(url: string) {
        if (!url.startsWith("https://") || !url.startsWith("http://"))
            throw new DomainError("bookmark url needs to contain 'http://' or 'https://'");

        this.url = url;
    }

    public setTitle(title: string) {
        this.notNull(title, "title");

        if (title.length > 100) throw new DomainError("bookmark title cannot have more than 100 characters");

        this.title = title
    }

    public setDescription(description: string) {
        this.notNull(description, "description");

        if (description.length > 300) throw new DomainError("bookmark description cannot have more than 300 characters");

        this.description = description
    }

    private notNull(value: string, type: string) {
        if (!value || value.trim() == "") throw new DomainError(`bookmark ${type} cannot be null`);
    }
}
