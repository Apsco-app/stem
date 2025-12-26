import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";

const competitions = [
  {
    name: "Regeneron ISEF",
    description: "The world's largest international pre-college science competition.",
    date: "May 2025",
    link: "https://www.societyforscience.org/isef/",
  },
  {
    name: "Stockholm Junior Water Prize",
    description: "Global competition for water-related science and engineering projects.",
    date: "August 2025",
    link: "https://www.siwi.org/prizes/stockholmjuniorwaterprize/",
  },
  {
    name: "International Math Olympiad",
    description: "The most prestigious mathematics competition for high school students.",
    date: "July 2025",
    link: "https://www.imo-official.org/",
  },
  {
    name: "Microsoft Imagine Cup",
    description: "Global technology competition for student innovation.",
    date: "March 2025",
    link: "https://imaginecup.microsoft.com/",
  },
];

export function CompetitionsSection() {
  return (
    <section className="section-container relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative">
        <SectionHeading
          badge="Global Competitions"
          title="Compete on the World Stage"
          subtitle="Our students represent Uganda in the most prestigious international STEM competitions."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitions.map((comp, index) => (
            <motion.a
              key={comp.name}
              href={comp.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group glass-card p-6 flex items-start gap-4 hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-grow">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {comp.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {comp.description}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs text-primary">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{comp.date}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/global">
              Explore Global Stage
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
