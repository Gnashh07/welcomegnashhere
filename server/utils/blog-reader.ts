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
    const txtFiles = files.filter(file => file.endsWith('.txt'));
    
    const posts = await Promise.all(
      txtFiles.map(async (file) => {
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
  const slug = filename.replace('.txt', '').toLowerCase();
  
  return {
    id: slug,
    title: metadata.title || 'Untitled',
    date: metadata.date || new Date().toISOString().split('T')[0],
    tags: (metadata.tags || '').split(',').map(tag => tag.trim()),
    content: lines.slice(contentStart).join('\n').trim(),
    slug,
  };
}
