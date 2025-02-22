import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <div className="space-y-4">
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </p>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert">
                {post.content}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
