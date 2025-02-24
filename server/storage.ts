import { blogPosts, books } from "@shared/schema";
import type { BlogPost, Book, InsertBlogPost, InsertBook, UpdateBlogPost, UpdateBook } from "@shared/schema";
import { readBlogPosts } from "./utils/blog-reader";
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
  getBook(id: number): Promise<Book | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, book: UpdateBook): Promise<Book>;
  deleteBook(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private books: Book[] = [
    {
      id: 1,
      title: "The Pragmatic Programmer",
      author: "David Thomas, Andrew Hunt",
      imageUrl: "https://example.com/pragmatic.jpg",
      review: "A must-read for every developer",
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      imageUrl: "https://example.com/clean-code.jpg",
      review: "Excellent principles for writing maintainable code",
    },
  ];

  private getNextBookId(): number {
    return Math.max(...this.books.map(book => book.id), 0) + 1;
  }

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

  async getAllBooks(): Promise<Book[]> {
    return this.books;
  }

  async getBook(id: number): Promise<Book | undefined> {
    return this.books.find(book => book.id === id);
  }

  async createBook(book: InsertBook): Promise<Book> {
    const newBook = { ...book, id: this.getNextBookId() };
    this.books.push(newBook);
    return newBook;
  }

  async updateBook(id: number, updateData: UpdateBook): Promise<Book> {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) throw new Error('Book not found');

    const updatedBook = { ...this.books[index], ...updateData };
    this.books[index] = updatedBook;
    return updatedBook;
  }

  async deleteBook(id: number): Promise<void> {
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }
}

export const storage = new MemStorage();