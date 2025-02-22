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

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  githubUrl: text("github_url").notNull(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  imageUrl: text("image_url").notNull(),
  review: text("review"),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertBookSchema = createInsertSchema(books).omit({ id: true });

export type BlogPost = typeof blogPosts.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Book = typeof books.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertBook = z.infer<typeof insertBookSchema>;