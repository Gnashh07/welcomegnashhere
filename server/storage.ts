import { users, type User, type InsertUser } from "@shared/schema";
import { blogPosts, projects, books } from "@shared/schema";
import type { BlogPost, Project, Book, InsertBlogPost, InsertProject, InsertBook } from "@shared/schema";
import { readBlogPosts } from "./utils/blog-reader";

export interface IStorage {
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getAllProjects(): Promise<Project[]>;
  getAllBooks(): Promise<Book[]>;
}

export class MemStorage implements IStorage {
  private projects: Project[];
  private books: Book[];

  constructor() {
    this.projects = [
      {
        id: 1,
        title: "Personal Portfolio",
        description: "A modern portfolio website built with React and TypeScript",
        imageUrl: "https://example.com/portfolio.jpg",
        githubUrl: "https://github.com/gnashhere/portfolio",
      },
      {
        id: 2,
        title: "Task Manager",
        description: "A simple task management application",
        imageUrl: "https://example.com/task-manager.jpg",
        githubUrl: "https://github.com/gnashhere/task-manager",
      },
    ];

    this.books = [
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
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return readBlogPosts();
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const posts = await this.getAllBlogPosts();
    return posts.find(post => post.slug === slug);
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getAllBooks(): Promise<Book[]> {
    return this.books;
  }
}

export const storage = new MemStorage();