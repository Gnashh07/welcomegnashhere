import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const blogPosts = pgTable("blog_posts", {
  id: text("id").primaryKey(), // Using text for ID to match the file slug
  title: text("title").notNull(),
  content: text("content").notNull(),
  date: text("date").notNull(),
  tags: text("tags").array().notNull(),
  slug: text("slug").notNull(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  imageUrl: text("image_url").notNull(),
  review: text("review"),
});

// Updated schemas to include necessary fields for update operations
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true });
export const updateBlogPostSchema = createInsertSchema(blogPosts);
export const insertBookSchema = createInsertSchema(books).omit({ id: true });
export const updateBookSchema = createInsertSchema(books);

export type BlogPost = typeof blogPosts.$inferSelect;
export type Book = typeof books.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>;
export type InsertBook = z.infer<typeof insertBookSchema>;
export type UpdateBook = z.infer<typeof updateBookSchema>;