import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchGitHubRepos, type GitHubRepo } from "@/lib/github";
import { SiGithub } from "react-icons/si";

export default function Projects() {
  const { data: repos, isLoading } = useQuery<GitHubRepo[]>({
    queryKey: ["/github/repos"],
    queryFn: fetchGitHubRepos,
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {repos?.map((repo) => (
          <Card key={repo.id} className="bg-background/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-mono">{repo.name}</h3>
                {repo.language && (
                  <span className="text-sm text-muted-foreground font-mono">
                    {repo.language}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-4 text-sm font-mono">
                {repo.description || "No description available"}
              </p>
              <div className="flex items-center justify-between">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:underline text-sm font-mono gap-2"
                >
                  <SiGithub className="h-4 w-4" />
                  View on GitHub
                </a>
                <span className="text-sm text-muted-foreground font-mono">
                  ★ {repo.stargazers_count}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}