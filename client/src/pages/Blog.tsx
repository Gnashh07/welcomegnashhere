import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {posts?.map((post) => (
          <Card key={post.id} className="hover:bg-accent/5 transition-colors duration-200">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <time className="text-sm text-muted-foreground">
                  {format(new Date(post.date), "MMMM dd, yyyy")}
                </time>
              </div>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {post.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}