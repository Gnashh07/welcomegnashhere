import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="space-y-6">
        {posts?.map((post) => (
          <h2 key={post.id} className="text-2xl hover:text-primary transition-colors cursor-pointer">
            {post.title}
          </h2>
        ))}
      </div>
    </div>
  );
}