import { Link } from "wouter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl">
        hey, it's{" "}
        <Link href="/about">
          <a className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
            gnashhere
          </a>
        </Link>
      </h1>
      <p className="text-muted-foreground mt-2">this is my second brain.</p>
      <nav className="mt-4 flex justify-center space-x-6">
        <Link href="/blog">
          <a className="text-muted-foreground hover:text-foreground transition-colors">
            blog
          </a>
        </Link>
        <Link href="/projects">
          <a className="text-muted-foreground hover:text-foreground transition-colors">
            projects
          </a>
        </Link>
        <Link href="/bookshelf">
          <a className="text-muted-foreground hover:text-foreground transition-colors">
            bookshelf
          </a>
        </Link>
      </nav>
      <div className="mt-4">
        <SocialLinks />
      </div>
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        © 2024 GnashHere. All Rights Reserved.
      </footer>
    </div>
  );
}