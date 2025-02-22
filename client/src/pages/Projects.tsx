import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { fetchGitHubRepos, type GitHubRepo } from "@/lib/github";
import { SiGithub } from "react-icons/si";
import { AlertCircle, Star, GitFork } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const { data: repos, isLoading, error } = useQuery<GitHubRepo[]>({
    queryKey: ["/github/repos"],
    queryFn: fetchGitHubRepos,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm font-mono">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <p className="text-destructive">Failed to load projects. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
        {repos?.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-card hover:bg-accent/5 transition-colors duration-200 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold font-mono truncate">{repo.name}</h3>
                  {repo.language && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-mono">
                      {repo.language}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground mb-6 text-sm flex-grow">
                  {repo.description || "No description available"}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-primary/80 transition-colors duration-200 text-sm font-mono gap-2"
                  >
                    <SiGithub className="h-4 w-4" />
                    View Code
                  </a>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm font-mono">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {repo.stargazers_count}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}