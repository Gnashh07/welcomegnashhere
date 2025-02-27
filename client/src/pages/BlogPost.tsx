import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { apiRequest } from "@/lib/queryClient";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["/api/blog-posts", slug],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/blog-posts/${slug}`);
      if (!response.ok) throw new Error("Blog post not found");
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !post) return <p className="text-destructive">⚠️ Blog post not found.</p>;

  return (
    <div className="min-h-screen flex justify-center">
      <article className="w-full max-w-2xl px-4 py-16 prose prose-invert">
        <h1 className="text-4xl font-mono mb-4">{post.title}</h1>
        <p className="text-sm text-muted-foreground font-mono">
          {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <div className="whitespace-pre-wrap font-mono">{post.content}</div>
      </article>
    </div>
  );
}
