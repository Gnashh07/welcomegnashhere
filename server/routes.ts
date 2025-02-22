import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog posts routes
  app.get("/api/blog-posts", async (_req, res) => {
    const posts = await storage.getAllBlogPosts();
    res.json(posts);
  });

  // GitHub token verification
  app.get("/api/github/token", (_req, res) => {
    if (!process.env.GITHUB_TOKEN) {
      res.status(401).json({ message: "GitHub token not configured" });
      return;
    }
    res.json({ token: process.env.GITHUB_TOKEN });
  });

  // Books routes
  app.get("/api/books", async (_req, res) => {
    const books = await storage.getAllBooks();
    res.json(books);
  });

  const httpServer = createServer(app);
  return httpServer;
}