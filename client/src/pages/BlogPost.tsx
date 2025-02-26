// client/src/pages/BlogPost.tsx

import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Invalid slug");
      const response = await fetch(`/api/blog-posts/${slug}`);
      if (!response.ok) throw new Error("Blog post not found");
      return response.json();
    },
    enabled: !!slug, // Only fetch when slug is available
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post || !post.content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">⚠️ Blog post not found or empty.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center">
      <article className="w-full max-w-2xl px-4 py-16 prose prose-invert">
        <h1 className="text-4xl font-mono mb-4">{post.title}</h1>
        <time className="text-sm text-muted-foreground font-mono">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700 text-white px-2 py-1 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="whitespace-pre-wrap font-mono mt-6">{post.content}</div>
      </article>
    </div>
  );
}
