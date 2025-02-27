import type { Express } from "express";
import { createServer, type Server } from "http";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function registerRoutes(app: Express): Promise<Server> {
  // 🔹 Fetch all blog posts
  app.get("/api/blog-posts", async (_req, res) => {
    try {
      const { data: posts, error } = await supabase
        .from("blog_posts")
        .select("*");

      if (error) throw error;
      res.json(posts || []);
    } catch (error) {
      console.error("❌ Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  // 🔹 Fetch a single blog post by slug
  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const { data: post, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", req.params.slug)
        .single();

      if (error) throw error;
      if (!post) {
        res.status(404).json({ message: "Blog post not found" });
        return;
      }
      res.json(post);
    } catch (error) {
      console.error("❌ Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // 🔹 Delete a blog post
  app.delete("/api/blog-posts/:slug", async (req, res) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("slug", req.params.slug);

      if (error) throw error;
      res.sendStatus(200);
    } catch (error) {
      console.error("❌ Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // 🔹 GitHub token verification
  app.get("/api/github/token", (_req, res) => {
    if (!process.env.GITHUB_TOKEN) {
      res.status(401).json({ message: "GitHub token not configured" });
      return;
    }
    res.json({ token: process.env.GITHUB_TOKEN });
  });

  // 🔹 Fetch all books
  app.get("/api/books", async (_req, res) => {
    try {
      const { data: books, error } = await supabase.from("books").select("*");
      if (error) throw error;
      res.json(books || []);
    } catch (error) {
      console.error("❌ Error fetching books:", error);
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  // 🔹 Add a new book
  app.post("/api/books", async (req, res) => {
    try {
      const { title, author, imageUrl, review } = req.body;
      const { error } = await supabase
        .from("books")
        .insert([{ title, author, imageUrl, review }]);

      if (error) throw error;
      res.status(201).json({ message: "Book added successfully" });
    } catch (error) {
      console.error("❌ Error creating book:", error);
      res.status(500).json({ message: "Failed to create book" });
    }
  });

  // 🔹 Delete a book
  app.delete("/api/books/:id", async (req, res) => {
    try {
      const { error } = await supabase
        .from("books")
        .delete()
        .eq("id", Number(req.params.id));

      if (error) throw error;
      res.sendStatus(200);
    } catch (error) {
      console.error("❌ Error deleting book:", error);
      res.status(500).json({ message: "Failed to delete book" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
