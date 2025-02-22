import { Link } from "wouter";
import SocialLinks from "@/components/SocialLinks";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-2xl mx-auto text-center">
      <Link href="/">
        <a className="text-muted-foreground hover:text-foreground mb-8">← back</a>
      </Link>
      <h1 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
        about me
      </h1>
      <p className="text-lg mb-8 text-muted-foreground">
        I'm a software engineer passionate about building beautiful and functional web applications. 
        When I'm not coding, you can find me reading tech books and writing about my experiences.
      </p>
      <SocialLinks />
    </div>
  );
}
