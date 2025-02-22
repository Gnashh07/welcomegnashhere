import { users, type User, type InsertUser } from "@shared/schema";
import { blogPosts, projects, books } from "@shared/schema";
import type { BlogPost, Project, Book, InsertBlogPost, InsertProject, InsertBook } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  getAllProjects(): Promise<Project[]>;
  getAllBooks(): Promise<Book[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: BlogPost[];
  private projects: Project[];
  private books: Book[];
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    this.blogPosts = [
      {
        id: 1,
        title: "Getting Started with React",
        content: "React is a powerful library for building user interfaces...",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: "The Power of TypeScript",
        content: "TypeScript adds static typing to JavaScript...",
        createdAt: new Date().toISOString(),
      },
    ];

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

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.blogPosts;
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getAllBooks(): Promise<Book[]> {
    return this.books;
  }
}

export const storage = new MemStorage();