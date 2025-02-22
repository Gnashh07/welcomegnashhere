import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl mb-2">
        hey, it's{" "}
        <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
          gnashhere
        </span>
      </h1>
      <p className="text-muted-foreground mb-16">this is my second brain.</p>

      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        © 2024 GnashHere. All Rights Reserved.
      </footer>
    </div>
  );
}