import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog posts routes
  app.get("/api/blog-posts", async (_req, res) => {
    const posts = await storage.getAllBlogPosts();
    res.json(posts);
  });

  // Projects routes
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getAllProjects();
    res.json(projects);
  });

  // Books routes
  app.get("/api/books", async (_req, res) => {
    const books = await storage.getAllBooks();
    res.json(books);
  });

  const httpServer = createServer(app);
  return httpServer;
}
