import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { fetchGitHubRepos, type GitHubRepo } from "@/lib/github";
import { SiGithub } from "react-icons/si";
import { Star } from "lucide-react";

export default function Projects() {
  const { data: repos, isLoading, error } = useQuery<GitHubRepo[]>({
    queryKey: ["/github/repos"],
    queryFn: fetchGitHubRepos,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-destructive">Failed to load projects. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {repos?.map((repo) => (
          <Card key={repo.id} className="bg-card hover:bg-accent/5 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold font-mono truncate">{repo.name}</h3>
                {repo.language && (
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {repo.language}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-6 text-sm">
                {repo.description || "No description available"}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:text-primary/80 transition-colors duration-200 gap-2"
                >
                  <SiGithub className="h-4 w-4" />
                  View Code
                </a>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  {repo.stargazers_count}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}