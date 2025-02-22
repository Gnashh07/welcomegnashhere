import { SiX, SiLinkedin, SiInstagram } from "react-icons/si";

export default function SocialLinks() {
  const socialLinks = [
    {
      href: "https://x.com/gnashxnax",
      icon: SiX,
      label: "X (Twitter)",
    },
    {
      href: "https://www.linkedin.com/in/ganeshpulipaka001/",
      icon: SiLinkedin,
      label: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/gnashhh_",
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