import { blogPosts, books } from "@shared/schema";
import type { BlogPost, Book, InsertBlogPost, InsertBook, UpdateBlogPost, UpdateBook } from "@shared/schema";
import { readBlogPosts } from "./utils/blog-reader";
import { readBooks } from "./utils/book-reader";
import fs from 'fs/promises';
import path from 'path';

export interface IStorage {
  // Blog operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(slug: string, content: string): Promise<void>;
  deleteBlogPost(slug: string): Promise<void>;

  // Book operations
  getAllBooks(): Promise<Book[]>;
  addBook(title: string, author: string, imageUrl: string, review: string): Promise<void>;
  deleteBook(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return readBlogPosts();
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = await this.getAllBlogPosts();
    return posts.find(post => post.slug === slug);
  }

  async updateBlogPost(slug: string, content: string): Promise<void> {
    const filePath = path.join(process.cwd(), 'server', 'blog-posts', `${slug}.txt`);
    await fs.writeFile(filePath, content, 'utf-8');
  }

  async deleteBlogPost(slug: string): Promise<void> {
    const filePath = path.join(process.cwd(), 'server', 'blog-posts', `${slug}.txt`);
    await fs.unlink(filePath);
  }

  // Book operations
  async getAllBooks(): Promise<Book[]> {
    return readBooks();
  }

  async addBook(title: string, author: string, imageUrl: string, review: string): Promise<void> {
    const booksDir = path.join(process.cwd(), 'server', 'books');
    const timestamp = Date.now();
    const filename = `${timestamp}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
    const filePath = path.join(booksDir, filename);

    const content = `TITLE: ${title}
AUTHOR: ${author}
IMAGE_URL: ${imageUrl}
---
${review}`;

    await fs.writeFile(filePath, content, 'utf-8');
  }

  async deleteBook(id: number): Promise<void> {
    const books = await this.getAllBooks();
    const book = books.find(b => b.id === id);
    if (!book) return;

    const booksDir = path.join(process.cwd(), 'server', 'books');
    const files = await fs.readdir(booksDir);

    // Find and delete the corresponding file
    for (const file of files) {
      const filePath = path.join(booksDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      if (content.includes(`TITLE: ${book.title}`)) {
        await fs.unlink(filePath);
        break;
      }
    }
  }
}

export const storage = new MemStorage();