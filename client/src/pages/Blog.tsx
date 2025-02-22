import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="space-y-12 max-w-2xl">
        {posts?.map((post) => (
          <div key={post.id} className="cursor-pointer group">
            <h2 className="text-2xl font-mono group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <div className="mt-2 text-sm text-muted-foreground font-mono">
              <span>gnash</span>
              <span className="mx-2">|</span>
              <span>{format(post.createdAt, "MMMM dd, yyyy")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}