import fs from 'fs/promises';
import path from 'path';
import type { Book } from '@shared/schema';

export async function readBooks(): Promise<Book[]> {
  const booksDir = path.join(process.cwd(), 'server', 'books');

  try {
    // Create the directory if it doesn't exist
    await fs.mkdir(booksDir, { recursive: true });

    const files = await fs.readdir(booksDir);
    const bookFiles = files.filter(file => file.endsWith('.txt'));

    const books = await Promise.all(
      bookFiles.map(async (file) => {
        const content = await fs.readFile(path.join(booksDir, file), 'utf-8');
        return parseBookFile(content, file);
      })
    );

    // Sort books by title
    return books.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('Error reading books:', error);
    return [];
  }
}

function parseBookFile(content: string, filename: string): Book {
  const lines = content.split('\n');
  const metadata: Record<string, string> = {};
  let reviewContent = '';
  let isReview = false;

  // Parse metadata
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === '---') {
      isReview = true;
      continue;
    }

    if (isReview) {
      reviewContent += line + '\n';
      continue;
    }

    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
      metadata[key.toLowerCase()] = value;
    }
  }

  // Generate id from filename
  const id = parseInt(filename.split('-')[0]) || 
    Math.floor(Math.random() * 1000000);

  return {
    id,
    title: metadata.title || 'Untitled',
    author: metadata.author || 'Unknown Author',
    imageUrl: metadata.image_url || '',
    review: reviewContent.trim() || metadata.review || null,
  };
}
