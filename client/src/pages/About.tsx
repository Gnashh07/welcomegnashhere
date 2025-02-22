import { Link } from "wouter";

export default function About() {
  const timelineItems = [
    "Wanted to be a wildlife biologist as a kid but got inclined towards space and physics.",
    "Participated in an intra-city science fair when I was 14 where I presented about time travel and quantum physics (ended up winning, lol).",
    "Got into MUNs and participated in a few.",
    "Took up electronics and communications. Also realized that I love to build stuff and pitch ideas.",
    "Built a podcasting-based community called Gen Speaks. Was a podcast host and researcher.",
    "Worked with some big-time founders and helped them design their community outreach panels and programs.",
    "Worked as a software developer at a well-known MNC for a year.",
    "Presently running an exclusive members-only community called The Renaissance.",
    "Learning AI/ML one research paper at a time and building some cool projects. (Check out my projects to know more)",
    "Currently working as an ML Engineer at Kona AI."
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-3xl mx-auto">
      <Link href="/">
        <a className="text-muted-foreground hover:text-foreground mb-8">← back</a>
      </Link>

      <h1 className="text-2xl md:text-3xl mb-8 font-mono">TL;DR of my story:</h1>

      <div className="space-y-4 text-left w-full px-4">
        {timelineItems.map((item, index) => (
          <div key={index} className="flex gap-4">
            <span className="text-orange-400 font-mono">{index + 1}.</span>
            <p className="font-mono text-orange-400">{item}</p>
          </div>
        ))}
        <p className="font-mono text-orange-400 text-center mt-8">
          Reach out to me to know more!!
        </p>
      </div>
    </div>
  );
}