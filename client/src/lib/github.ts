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

  try {
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
      console.error("GitHub API Error:", await response.text());
      throw new Error("Failed to fetch GitHub repositories");
    }

    const repos = await response.json();
    return repos
      .filter((repo: GitHubRepo) => !repo.description?.includes("private"))
      .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    throw error;
  }
}