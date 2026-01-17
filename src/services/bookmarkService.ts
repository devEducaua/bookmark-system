import { eq } from "drizzle-orm";
import db from "../db";
import { bookmarksTable } from "../db/schema";
import { BookmarkDtoRequest, BookmarkDtoResponse } from "../schemas/bookmarkSchemas";
import Bookmark from "../domain/bookmark";

export default class BookmarkService {

    async getAll(): Promise<BookmarkDtoResponse[]> {
        const result = await db.select().from(bookmarksTable);
        return result;
    }

    async getOne(id: number): Promise<BookmarkDtoResponse> {
        const [result] = await db.select().from(bookmarksTable).where(eq(bookmarksTable.id, id));
        return result;
    }

    async create(dto: BookmarkDtoRequest, userId: number): Promise<number> {
        const { url, title, description } = dto;

        new Bookmark(url, title, description);

        const [result] = await db.insert(bookmarksTable)
                                 .values({ url, title, description, userId })
                                 .returning({ id: bookmarksTable.id });

        return result.id;
    }

    async update(dto: BookmarkDtoRequest, id: number) {
        const { url, title, description } = dto;

        new Bookmark(url, title, description);

        await db.update(bookmarksTable)
                 .set({ url: url, title: title, description: description })
                 .where(eq(bookmarksTable.id, id))
    }

    async delete(id: number) {
        await db.delete(bookmarksTable).where(eq(bookmarksTable.id, id));
    }
}
