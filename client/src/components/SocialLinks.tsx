import { SiX, SiLinkedin, SiInstagram } from "react-icons/si";

export default function SocialLinks() {
  const socialLinks = [
    {
      href: "https://twitter.com/gnashhere",
      icon: SiX,
      label: "X (Twitter)",
    },
    {
      href: "https://linkedin.com/in/gnashhere",
      icon: SiLinkedin,
      label: "LinkedIn",
    },
    {
      href: "https://instagram.com/gnashhere",
      icon: SiInstagram,
      label: "Instagram",
    },
  ];

  return (
    <div className="flex items-center space-x-4">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <link.icon className="h-5 w-5" />
          <span className="sr-only">{link.label}</span>
        </a>
      ))}
    </div>
  );
}