import { apiRequest } from "./queryClient";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  private: boolean; // Added to filter private repos
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const username = "Gnashh07"; // Your GitHub username

  try {
    // Use public API without authentication for public repos
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub repositories: ${response.status}`);
    }

    const repos = await response.json();
    return repos
      .filter((repo: GitHubRepo) => !repo.private) // Only show public repos
      .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    throw error;
  }
}