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
  const username = "gnashxnax"; // Updated GitHub username to match your X handle

  try {
    // First verify if we have access to the token
    const tokenResponse = await apiRequest("GET", "/api/github/token");
    if (!tokenResponse.ok) {
      throw new Error("GitHub token not configured");
    }

    const { token } = await tokenResponse.json();

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Authorization: `token ${token}`, // Changed Bearer to token
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
      .filter((repo: GitHubRepo) => !repo.description?.includes("private"))
      .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    throw error;
  }
}