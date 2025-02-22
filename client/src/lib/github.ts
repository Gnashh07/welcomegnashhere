import { apiRequest } from "./queryClient";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const username = "Gnashh07"; 

  try {
    const tokenResponse = await apiRequest("GET", "/api/github/token");
    if (!tokenResponse.ok) {
      throw new Error("GitHub token not configured");
    }

    const { token } = await tokenResponse.json();

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API Error:", errorText);
      throw new Error(`Failed to fetch GitHub repositories: ${response.status}`);
    }

    const repos = await response.json();
    return repos
      .filter((repo: GitHubRepo) => !repo.fork && !repo.archived)
      .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6); 
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    throw error;
  }
}