import fs from 'fs/promises';
import path from 'path';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  slug: string;
}

export async function readBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'server', 'blog-posts');

  try {
    // Create the directory if it doesn't exist
    await fs.mkdir(blogDir, { recursive: true });

    const files = await fs.readdir(blogDir);
    const supportedFiles = files.filter(file => file.endsWith('.txt') || file.endsWith('.rtf'));

    const posts = await Promise.all(
      supportedFiles.map(async (file) => {
        const content = await fs.readFile(path.join(blogDir, file), 'utf-8');
        return parseBlogPost(content, file);
      })
    );

    // Sort posts by date, newest first
    return posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

function parseBlogPost(content: string, filename: string): BlogPost {
  // Remove RTF formatting if it's an RTF file
  if (filename.endsWith('.rtf')) {
    content = stripRtfFormatting(content);
  }

  const lines = content.split('\n');
  const metadata: Record<string, string> = {};
  let contentStart = 0;

  // Parse metadata
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '---') {
      contentStart = i + 1;
      break;
    }

    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
      metadata[key.toLowerCase()] = value;
    }
  }

  // Generate slug from filename
  const slug = filename.replace(/\.(txt|rtf)$/, '').toLowerCase();

  return {
    id: slug,
    title: metadata.title || 'Untitled',
    date: metadata.date || new Date().toISOString().split('T')[0],
    tags: (metadata.tags || '').split(',').map(tag => tag.trim()),
    content: lines.slice(contentStart).join('\n').trim(),
    slug,
  };
}

function stripRtfFormatting(rtfContent: string): string {
  // Basic RTF stripping - remove RTF headers and common formatting
  let text = rtfContent;

  // Remove RTF header
  text = text.replace(/^{\\rtf1.*?(?=TITLE:)}/s, '');

  // Remove common RTF formatting
  text = text.replace(/\{\\\w+\s/g, ''); // Remove formatting groups
  text = text.replace(/\\[a-z0-9]+\s?/g, ''); // Remove control words
  text = text.replace(/\}/g, ''); // Remove closing braces
  text = text.replace(/\\\n/g, '\n'); // Fix newlines

  return text;
}