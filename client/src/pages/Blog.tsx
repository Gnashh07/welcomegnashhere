import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-center"
    >
      <div className="w-full max-w-2xl px-4 py-16">
        <div className="space-y-12">
          {posts?.map((post, index) => (
            <motion.article 
              key={post.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-border pb-8"
            >
              <div className="flex items-baseline justify-between mb-2">
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-2xl font-mono group-hover:text-primary transition-all duration-300 ease-in-out transform group-hover:translate-x-1">
                    {post.title}
                  </h2>
                </Link>
                <time className="text-sm text-muted-foreground font-mono">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex gap-2 mt-2">
                {post.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="font-mono text-xs hover:bg-primary/10 transition-colors duration-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}