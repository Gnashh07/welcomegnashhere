import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";
import "dotenv/config";

// 🔹 Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// 🔹 Folder where your books are stored
const bookDir = path.join(process.cwd(), "server", "books");

async function migrateBooks() {
  console.log("📚 Starting book migration...");
  try {
    const files = await fs.readdir(bookDir);

    for (const file of files) {
      const filePath = path.join(bookDir, file);
      const content = await fs.readFile(filePath, "utf-8");
      const lines = content.split("\n").map((line) => line.trim());

      if (lines.length < 3) {
        console.warn(`⚠️ Skipping ${file}, incorrect format`);
        continue;
      }

      const title = lines[0];
      const author = lines[1];
      const review = lines.slice(2).join("\n");
      const slug = title.replace(/\s+/g, "-").toLowerCase();

      const { error } = await supabase.from("books").insert([
        { title, author, review, slug },
      ]);

      if (error) {
        console.error(`❌ Failed to upload ${file}:`, error);
      } else {
        console.log(`✅ Uploaded ${file} successfully!`);
      }
    }
  } catch (error) {
    console.error("❌ Error migrating books:", error);
  }
}

migrateBooks();
