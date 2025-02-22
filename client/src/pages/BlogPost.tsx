import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import type { BlogPost } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">Blog post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center">
      <article className="w-full max-w-2xl px-4 py-16 prose prose-invert">
        <h1 className="text-4xl font-mono mb-2">{post.title}</h1>
        <div className="flex items-center gap-4 mb-8">
          <time className="text-sm text-muted-foreground font-mono">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-mono text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="whitespace-pre-wrap font-mono">{post.content}</div>
      </article>
    </div>
  );
}