import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog posts routes
  app.get("/api/blog-posts", async (_req, res) => {
    const posts = await storage.getAllBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) {
      res.status(404).json({ message: "Blog post not found" });
      return;
    }
    res.json(post);
  });

  app.delete("/api/blog-posts/:slug", async (req, res) => {
    try {
      await storage.deleteBlogPost(req.params.slug);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
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
    try {
      const books = await storage.getAllBooks();
      res.json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  app.post("/api/books", async (req, res) => {
    try {
      const { title, author, imageUrl, review } = req.body;
      await storage.addBook(title, author, imageUrl, review);
      const books = await storage.getAllBooks();
      res.status(201).json(books);
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ message: "Failed to create book" });
    }
  });

  app.delete("/api/books/:id", async (req, res) => {
    try {
      await storage.deleteBook(Number(req.params.id));
      res.sendStatus(200);
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Failed to delete book" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}