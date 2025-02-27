import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// 🔹 Folder where your blog files are stored
const blogDir = path.join(process.cwd(), "server", "blog-posts");

async function migrateBlogs() {
  try {
    console.log("🔹 Starting blog migration...");

    const files = await fs.readdir(blogDir);
    if (files.length === 0) {
      console.log("⚠️ No blog files found. Exiting.");
      return;
    }

    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = await fs.readFile(filePath, "utf-8");

      // 🔹 Convert filename to slug (remove extension & spaces)
      const slug = file.replace(/\.[^/.]+$/, "").replace(/\s+/g, "-").toLowerCase();

      console.log(`📂 Processing file: ${file} → Slug: ${slug}`);

      // 🔹 Insert blog into Supabase
      const { data, error } = await supabase
        .from("blog_posts")
        .insert([
          { title: file.replace(/\.[^/.]+$/, ""), slug, content, tags: ["general"] },
        ])
        .select();

      if (error) {
        console.error(`❌ Failed to upload ${file}:`, error);
      } else {
        console.log(`✅ Uploaded ${file} successfully! Response:`, data);
      }
    }
  } catch (error) {
    console.error("❌ Error migrating blogs:", error);
  }
}

// Run the migration
migrateBlogs();
