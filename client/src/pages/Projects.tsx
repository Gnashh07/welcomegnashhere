import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@shared/schema";

const projectImages = [
  "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  "https://images.unsplash.com/photo-1739514984003-330f7c1d2007",
  "https://images.unsplash.com/photo-1510759395231-72b17d622279",
];

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects?.map((project, index) => (
          <Card key={project.id}>
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img
                src={projectImages[index % projectImages.length]}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View on GitHub →
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
