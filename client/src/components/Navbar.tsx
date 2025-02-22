import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const navItems = [
    { href: "/blog", label: "blog" },
    { href: "/projects", label: "projects" },
    { href: "/bookshelf", label: "bookshelf" },
  ];

  return (
    <nav className="fixed bottom-24 left-0 right-0 flex justify-center space-x-8">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <a className="text-muted-foreground hover:text-foreground transition-colors">
            {item.label}
          </a>
        </Link>
      ))}
    </nav>
  );
}