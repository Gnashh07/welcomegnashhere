import { apiRequest } from "./queryClient";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const username = "gnashhere"; // Your GitHub username
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repositories");
  }

  const repos = await response.json();
  return repos.filter((repo: GitHubRepo) => !repo.description?.includes("private"));
}
